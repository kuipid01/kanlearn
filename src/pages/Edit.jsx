//... (other imports)
import { CiVideoOn } from 'react-icons/ci'
import { useEffect, useRef, useState } from 'react'
import { FcPicture } from 'react-icons/fc'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import { useToast } from '@/@/components/ui/use-toast'
import { IoIosClose } from 'react-icons/io'

const Edit = () => {
  const { toast } = useToast()
  const { user } = useAuth()
 
  const [video, setVideo] = useState()
  const { id } = useParams()
  const docRef = doc(db, "videos", id);
  const navigate = useNavigate()
  const perkInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [perks, setPerks] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null) // New state for thumbnail preview
  const [videoPreview, setVideoPreview] = useState(null) // New state for thumbnail preview

  const [videoFile, setVideoFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  // const [video, setVideo] = useState({
  //   title: '',
  //   desc: '',
  //   price: '',
  //   longdesc: '',
  //   imageUrl: '',
  //   importance: [],
  //   vidUrl: '',
  // })

  // console.log(video)
  const getVideoById = async () => {
    try {
      const videoRef = doc(db, 'videos', id)
      const videoSnapshot = await getDoc(videoRef)

      if (videoSnapshot.exists()) {
        const videoData = { id: videoSnapshot.id, ...videoSnapshot.data() }
        console.log('Video Data:', videoData)
        setVideo(videoData)
        return videoData
      } else {
        console.log('Video not found')
        return null
      }
    } catch (error) {
      console.error('Error fetching video by ID:', error)
      return null
    }
  }
  useEffect(() => {
    getVideoById()
  }, [])
  const addPerk = () => {
    const newPerk = perkInputRef.current.value.trim()
    if (newPerk !== '') {
      setPerks((prevPerks) => [...prevPerks, newPerk])
      setVideo((prevVideo) => ({
        ...prevVideo,
        importance: [...prevVideo.importance, newPerk],
      }))
      perkInputRef.current.value = ''
    }
  }

  const removePerk = (index) => {
    setPerks((prevPerks) => {
      const newPerks = [...prevPerks]
      newPerks.splice(index, 1)
      return newPerks
    })

    setVideo((prevVideo) => {
      const newImportance = [...prevVideo.importance]
      newImportance.splice(index, 1)
      return { ...prevVideo, importance: newImportance }
    })
  }

  // console.log(video)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]

    // Set the thumbnail file
    setImageFile(file)

    // Display a preview of the thumbnail
    const reader = new FileReader()
    reader.onloadend = () => {
      setThumbnailPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0]

    // Set the thumbnail file
    setVideoFile(file)

    // Display a preview of the thumbnail
    const reader = new FileReader()
    reader.onloadend = () => {
      setVideoPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const storage = getStorage()
  const timestamp = new Date().getTime()
  const storageRef = ref(
    storage,
    `images/${timestamp}_${imageFile && imageFile.name.replace(/\s/g, '')}`
  )

  const storageRefVid = ref(
    storage,
    `videos/${timestamp}_${videoFile && videoFile.name.replace(/\s/g, '')}`
  )

  // console.log(thumbnail?.name.replace(/\s/g, ''))
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log({...video},videoFile,thumbnail  )
    // Check if all fields are filled
     if (
       video.desc === '' ||
       video.title === '' ||
       video.importance.length <= 0 ||
       videoFile === null ||
       imageFile === null
     ) {
       alert('Fill in all fields and ensure to add a thumbnail and a video')
       return
     }

     try {
       setLoading(true)
      //  Upload Thumbnail
       const thumbnailUploadTask = uploadBytesResumable(storageRef, imageFile)

       thumbnailUploadTask.on(
         'state_changed',
         (thumbnailSnapshot) => {
           // Handle thumbnail upload progress
           const thumbnailProgress =
             (thumbnailSnapshot.bytesTransferred /
               thumbnailSnapshot.totalBytes) *
             100

           setProgress(`Image Upload is ${Math.floor(thumbnailProgress)}% done`)
         },
         (thumbnailError) => {
           // Handle thumbnail upload errors

           throw thumbnailError // Propagate the error to catch block
         }
       )

       // Wait for the thumbnail upload to complete
       await thumbnailUploadTask

      //  Get the download URL for the thumbnail
       const thumbnailUrl = await getDownloadURL(
         thumbnailUploadTask.snapshot.ref
       )

        //Upload Video
       const videoUploadTask = uploadBytesResumable(storageRefVid, videoFile)

       videoUploadTask.on(
         'state_changed',
         (videoSnapshot) => {
             //Handle video upload progress
           const videoProgress =
             (videoSnapshot.bytesTransferred / videoSnapshot.totalBytes) * 100
           console.log(`Video Upload is ${videoProgress}% done`)
           setProgress(`Video Upload is ${Math.floor(videoProgress)}% done`)
         },
         (videoError) => {
           //  Handle video upload errors
           console.error('Video Upload Error:', videoError)
           throw videoError// Propagate the error to catch block
         }
       )

       // Wait for the video upload to complete
       await videoUploadTask

       // Get the download URL for the video
       const videoUrl = await getDownloadURL(videoUploadTask.snapshot.ref)

        //Edit video details to Firestore
       console.log({
         ...video
       })
       await updateDoc(docRef, {
         ...video,
         imageUrl: thumbnailUrl,
         vidUrl: videoUrl,
         user: user.uid,
         creator: user.displayName,
         tags: [],
         totalTimesRated: 0,
       })

       toast({
         title: 'Video Edited',
         description: 'Video Edited Succesfully.',
       })
       // Reset form state by creating a new video object
       setVideo({
         title: '',
         desc: '',
         price: '',
         longdesc: '',
         imageUrl: '',
         importance: [],
         vidUrl: '',
       })
       setPerks([])
       setThumbnail(null)
       setThumbnailPreview(null)
       setVideoPreview(null)
       setVideoFile(null)
       setProgress('Video Edited successfully!')
       navigate('/')
       setLoading(false)
     } catch (error) {
       setProgress('An error occured,Try again or contact help')
       toast({
         variant: 'destructive',
         title: 'Uh oh! Something went wrong.',
         description: 'There was a problem with your request.',
       })
       setLoading(false)
       console.error('Error adding video:', error)
     }
  }
  const produtDetails = {
    category: 'Tech',
    subategory: 'React',
    title: 'Making react app tuturial on building ',
    desc: 'omple tuturial on building your first react app',
    totalstars: 10,
    totalTimesRated: 3,
    averageStars: null,
    creator: 'stephen adegoke',
    language: 'English',

    scope: ['Be familiar with reat syntax ', 'Create apps that scales'],
    courseImage: '',
    price: 30000,
    newPrice: 5000,
  }
  return (
    <div className="page min-h-screen h-fit pb-16 text-black">
      <div className="flex flex-col gap-5 w-5/6 mx-auto">
        <h1 className="text-2xl">Edit Tutorials</h1>
        {loading ? (
          <div className=" flex flex-col justify-center items-center gap-3 h-fit p-5 rounded-md border shadow-lg ">
            <p className=" capitalize ">{progress}</p>
            <img
              className="w-12 h-12 rounded-full transition-all"
              src="/loading.svg"
              alt=""
            />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            action=""
          >
            <input
              value={video?.title}
              placeholder="Enter Video Title"
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              type="text"
            />
            <input
              value={video?.desc}
              onChange={(e) => setVideo({ ...video, desc: e.target.value })}
              placeholder="Enter Video Description"
              className="w-full p-3 border outline-primary-light border-gray-400 rounded-[10px]"
              type="text"
            />
            <div className="cursor-pointer relative h-[150px] border-gray-400 rounded-[10px] flex justify-center items-center w-full p-3  border">
              <label
                className="w-full uppercase text-primary-light flex justify-center items-center bg-transparent h-full cursor-pointer  text-center"
                htmlFor="thumbnail"
              >
                {' '}
                Edit Thumbnail
              </label>
              <FcPicture className=" absolute text-5xl mt-10 top-1/2 -translate-y-1/2" />
              <input
                onChange={handleThumbnailChange}
                name="thumbnail"
                id="thumbnail"
                className="w-full outline-primary-light h-full cursor-pointer hidden "
                type="file"
              />
            </div>
            <div className="  flex gap-2">
              {video?.imageUrl && (
                <img
                  className=" w-32 h-32 border"
                  src={video?.imageUrl}
                  alt=""
                />
              )}
              {thumbnailPreview && (
                <div className="p-2 border ">
                  <p className="text-sm">New Thumbnail</p>
                  <img
                    className=" w-32 h-32 border"
                    src={thumbnailPreview}
                    alt=""
                  />
                </div>
              )}
            </div>

            <input
              value={video?.price}
              onChange={(e) => setVideo({ ...video, price: e.target.value })}
              placeholder=" Price"
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              type="number"
            />
            <input
              value={video?.newPrice}
              onChange={(e) => setVideo({ ...video, newPrice: e.target.value })}
              placeholder="Enter New Price"
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              type="number"
            />

            <textarea
              value={video?.longdesc}
              onChange={(e) => setVideo({ ...video, longdesc: e.target.value })}
              placeholder="Enter long description"
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>

            <div className="flex">
              <input
                ref={perkInputRef}
                placeholder="Enter perks, Hit enter to register"
                className="flex-1 outline-primary-light p-3 border border-gray-400 rounded-[10px]"
                type="text"
              />
              <button
                type="button"
                onClick={addPerk}
                className="w-fit px-3 bg-primary-light ml-4 rounded-[10px] text-white"
              >
                Edit Perk
              </button>
            </div>
            {video?.importance?.length > 0 && (
              <div className="flex bg-white shadow border border-gray-300 p-5 gap-2 flex-col">
                {video?.importance?.map((item, i) => (
                  <div
                    className="p-2 px-4 flex items-center justify-between border-gray-500 bg-gray-200 rounded-[10px]  border"
                    key={i}
                  >
                    <p>{item}</p>
                    <IoIosClose
                      onClick={() => removePerk(i)}
                      className="text-2xl text-red-500 "
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="cursor-pointer relative h-[150px] border-gray-400 rounded-[10px] flex justify-center items-center w-full p-3  border">
              <label
                className="w-full uppercase text-primary-light flex justify-center items-center bg-transparent h-full cursor-pointer  text-center"
                htmlFor="video"
              >
                {' '}
                Edit Video
              </label>
              <CiVideoOn className=" absolute text-5xl mt-10 top-1/2 -translate-y-1/2" />
              <input
                name="video"
                id="video"
                className="w-full outline-primary-light h-full cursor-pointer hidden "
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
              />
            </div>
            <div className="  flex gap-2">
              {video?.vidUrl && (
                <video
                  className=" w-32 h-32 border"
                  src={video.vidUrl}
                  alt=""
                />
              )}
              {videoPreview && (
                <div className="p-2 border ">
                  <p className="text-sm">New Video</p>
                  <video
                    className=" w-32 h-32 border"
                    src={videoPreview}
                    alt=""
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-[10px] bg-primary-light h-[60px] text-white font-bold"
            >
              CONFIRM VIDEO
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Edit
