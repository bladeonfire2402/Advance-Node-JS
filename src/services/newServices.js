import newsModel from "../model/newsModel.js"

class NewsServices{
    //create a new
    createNews = async(data) =>{
        try{
            const newNews = new newsModel(data)
            return await newNews.save()     
        }catch(error){
            console.log(error)
            return false
        }
    }
    //get all books
    getAllNews= async()=>{
        try{
        const allNews = await newsModel.find();
        return allNews
        }
        catch(err){
            console.log("Lỗi lấy dữ liệu")
            return false
        }
    }

    // get a new by id
    getANewsById= async(id)=>{   
        try{
            const aNew = await newsModel.findOne({_id:id})
            return aNew
        }catch(error){
            console.log(error)
            return false
        }
    }

    //get new by title
    getNewsByTitle = async (title) => {
        try {
            const aNewTitle = await newsModel.findOne({ title: title });
            return aNewTitle
        } catch (error) {
            console.log(error);
            return false
        }
    }

    //update new
    updateNews= async(newId,newData)=>{   
        try{
            const cleanId = newId.trim() // Xóa khoảng trắng thừa
            const newNew = await newsModel.findByIdAndUpdate(newId,newData,{new:true, runValidators:true});
            return newNew
        }catch(error){
            console.log(error)
            return false
        }
    }

    // detele a new by id
    deleteNewsById= async(newsId)=>{
        try{
            const deleteNewsById = await newsModel.deleteOne({_id:newsId})
            if (result.deleteNewsById === 0) {
                console.log("Không có tin tức nào bị xóa")
                return false
            }
    
            console.log("Xóa thành công", result)
            return true
        }
            catch(error){
                console.log(error)
                return false
            }
    }
};
export default new NewsServices