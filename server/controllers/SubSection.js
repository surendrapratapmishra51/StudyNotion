const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadimageToCloudinary} = require("../utils/imageUploader");


// create subSection

exports.createSubSection = async (req,res) =>{
    try{
        // Extract necessary information from the request body
        const {sectionId,title,description} = req.body;

        //extract video
        const videoFile = req.files.videoFile;
        // validate 
        if(!sectionId || !title || !description || !videoFile){
            return res.status(400).json({
                success:false,
                message:'All fields are require',
            });
        }
   console.log("printing video while creating subsection",videoFile)

        // upload the video file to clodinary
        const uploadDetails = await uploadimageToCloudinary(
          videoFile,
          process.env.FOLDER_NAME);
        console.log("uploadDetails",uploadDetails)
        //create a new sub-section with the necessary information
        const SubSectionDetails = await SubSection.create({
                title:title,
                timeDuration: `${uploadDetails.duration}`,
                description: description,
                videoUrl: uploadDetails.secure_url,
        })
        console.log("subsection",SubSectionDetails);
       // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{
                                                                subSection:SubSectionDetails._id,
                                                            }},
                                                            {new:true})
                                                            .populate("subSection")

            // Return the updated section in the response
            return res.status(200).json({
                success:true,
                data:updatedSection,
                message:'SubSection created successfully',
            });
    }
    catch(error){
         // Handle any errors that may occur during the process
         console.error("Error creating new sub-section:",error)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error hai isme',
            error:error.message,
        })
    }
};

exports.updateSubSection = async (req, res) =>{
    try{
        const {sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }

        if(title !== undefined){
            subSection.title = title
        }

        if (description !== undefined) {
        subSection.description = description
      }

      if(req.files && req.files.videoFile !== undefined){
        const videoFile = req.files.video
        const uploadDetails = await uploadimageToCloudinary(
            videoFile,
            process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }

      await subSection.save()
      const updatedSection = await Section.findById(sectionId).populate("subSection")

      return res.json({
        success:true,
        data:updatedSection,
        message:"Section updated successfully",
      })
        
    }
    catch(error){
        console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })

    }
}

  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

        const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }