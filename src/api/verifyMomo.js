const verifyPayment = (queryParams, secretKey) => {
    const { signature, resultCode, orderId, transId, message, amount, orderInfo, extraData, partnerCode, requestId, responseTime } = queryParams;

    // Tạo lại chuỗi dữ liệu cần tính lại chữ ký
    const rawSignature = `orderId=${orderId}&transId=${transId}&resultCode=${resultCode}&message=${message}&amount=${amount}&orderInfo=${orderInfo}&extraData=${extraData}&partnerCode=${partnerCode}&requestId=${requestId}&responseTime=${responseTime}`;

    // Tính lại chữ ký bằng HMAC SHA256
    const signatureCalculated = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    // Kiểm tra nếu chữ ký tính toán được trùng với chữ ký trong queryParams
    return signature === signatureCalculated;
};

export default verifyPayment