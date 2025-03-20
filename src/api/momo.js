import https from 'https';


export const sendPaymentRequestToMoMo = (paymentData) => {
    return new Promise((resolve, reject) => {
        const requestBody = JSON.stringify(paymentData);

        // Thiết lập các tùy chọn cho yêu cầu HTTPS
        const options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            }
        };

        // Gửi yêu cầu đến MoMo
        const momoRequest = https.request(options, momoRes => {
            let responseBody = '';

            // Thu thập dữ liệu phản hồi từ MoMo
            momoRes.on('data', chunk => {
                responseBody += chunk;
            });

            // Khi phản hồi xong, xử lý dữ liệu
            momoRes.on('end', () => {
                try {
                    // Chuyển đổi phản hồi thành đối tượng JSON
                    const parsedBody = JSON.parse(responseBody);

                    // Kiểm tra nếu có trường payUrl trong phản hồi
                    if (parsedBody.payUrl) {
                        // Trả về URL thanh toán để người dùng có thể tiếp tục thanh toán
                        resolve(parsedBody.payUrl);
                    } else {
                        // Nếu không có payUrl trong phản hồi, trả về lỗi
                        reject(new Error('No payUrl in response from MoMo'));
                    }
                } catch (err) {
                    console.error('Error parsing response body:', err);
                    reject(new Error('Error parsing response from MoMo'));
                }
            });
        });

        // Xử lý lỗi nếu có trong quá trình gửi yêu cầu
        momoRequest.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            reject(new Error(`Problem with request to MoMo: ${e.message}`));
        });

        // Gửi dữ liệu yêu cầu đến MoMo
        momoRequest.write(requestBody);
        momoRequest.end();
    });
};