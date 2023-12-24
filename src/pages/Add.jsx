//... (other imports)
import { CiVideoOn } from 'react-icons/ci'
import { useRef, useState } from 'react'
import { FcPicture } from 'react-icons/fc'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Add = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const perkInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')
  const [perks, setPerks] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [video, setVideo] = useState({
    title: '',
    desc: '',
    price: '',
    longdesc: '',
    imageUrl: '',
    importance: [],
    vidUrl: '',
   
  })

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

  // console.log(video)

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0])
    if (file) {
      // Read the selected file and create a data URL
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnail(file);
        setVideo((prevVideo) => ({
          ...prevVideo,
          imageUrlPreview: reader.result, // Store the preview URL in the state
        }));
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  const handleVideoFileChange = (e) => {
    setVideoFile(e.target.files[0])
  }
  const storage = getStorage()
  const storageRef = ref(storage, 'images/')
  const storageRefVid = ref(storage, 'videos/')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      // Upload Thumbnail
      const thumbnailUploadTask = uploadBytesResumable(storageRef, thumbnail)

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

          throw thumbnailError //Propagate the error to catch block
        }
      )

      // Wait for the thumbnail upload to complete
      await thumbnailUploadTask

      // Get the download URL for the thumbnail
      const thumbnailUrl = await getDownloadURL(
        thumbnailUploadTask.snapshot.ref
      )

      // Upload Video
      const videoUploadTask = uploadBytesResumable(storageRefVid, videoFile)

      videoUploadTask.on(
        'state_changed',
        (videoSnapshot) => {
          //  Handle video upload progress
          const videoProgress =
            (videoSnapshot.bytesTransferred / videoSnapshot.totalBytes) * 100
          console.log(`Video Upload is ${videoProgress}% done`)
          setProgress(`Video Upload is ${Math.floor(videoProgress)}% done`)
        },
        (videoError) => {
          //  Handle video upload errors
          console.error('Video Upload Error:', videoError)
          throw videoError //Propagate the error to catch block
        }
      )

      // Wait for the video upload to complete
      await videoUploadTask

      // Get the download URL for the video
      const videoUrl = await getDownloadURL(videoUploadTask.snapshot.ref)

      // Add video details to Firestore
      await addDoc(collection(db, 'videos'), {
        ...video,
        imageUrl: thumbnailUrl,
        vidUrl: videoUrl,
        user:user.uid,
        creator:user.displayName,
        newPrice:0,
        tags:[],
        totalTimesRated:0,
      })

      //  Reset form state
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
      setVideoFile(null)
      setProgress('Video added successfully!')
      navigate('/')
      setLoading(false)
    } catch (error) {
      setProgress('An error occured,Try again or contact help')
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
        <h1 className="text-2xl">Add Tutorials</h1>
        {loading ? (
          <div className=" flex flex-col justify-center items-center gap-3 h-fit p-5 rounded-md border shadow-lg ">
            <p className=' capitalize '>{progress}</p>
            <img className='w-12 h-12 rounded-full transition-all'  src="/loading.svg" alt="" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            action=""
          >
            <input
              value={video.title}
              placeholder="Enter Video Title"
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              type="text"
            />
            <input
              value={video.desc}
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
                Add Thumbnail
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

            <input
              value={video.price}
              onChange={(e) => setVideo({ ...video, price: e.target.value })}
              placeholder="Enter Price"
              className="w-full outline-primary-light p-3 border border-gray-400 rounded-[10px]"
              type="number"
            />

            <textarea
              value={video.longdesc}
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
                Add Perk
              </button>
            </div>
            {perks.length > 0 && (
              <div className="flex bg-white shadow border border-gray-300 p-5 gap-2 flex-col">
                {perks?.map((item, i) => (
                  <div
                    className="p-2 border-gray-500 bg-gray-200 rounded-[10px]  border"
                    key={i}
                  >
                    <p>{item}</p>
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
                Add Video
              </label>
              <CiVideoOn className=" absolute text-5xl mt-10 top-1/2 -translate-y-1/2" />
              <input
                name="video"
                id="video"
                className="w-full outline-primary-light h-full cursor-pointer hidden "
                type="file"
                onChange={handleVideoFileChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[10px] bg-primary-light h-[60px] text-white font-bold"
            >
              ADD VIDEO
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Add
