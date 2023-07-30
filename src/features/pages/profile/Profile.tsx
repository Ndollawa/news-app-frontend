import React,{useEffect,useState} from 'react'
import Modal from '../../../components/Modal';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../auth/authSlice'
import useUserImage from '../../../app/utils/hooks/useUserImage'


interface IProfile{
    showUserProfile:boolean;
    setShowProfile:React.SetStateAction<any>
}
type ProfilePreferences = {
  preferred_authors?: string[]; 
  preferred_sources?: string[]; 
};


const Profile = ({showUserProfile,setShowProfile}:IProfile) => {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
   const {profile} = currentUser
  const {preferred_authors,preferred_sources} = profile as ProfilePreferences || []

  return (

<>
<Modal isVisible={showUserProfile} onClose={()=>setShowProfile(false)}>
  
      <div className="flex flex-wrap justify-center">
        <div className="w-full flex justify-center">
          <div className="relative">
            <img alt={currentUser?.name} src={userImage} width={'150'} className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"/>
          </div>
        </div>
        <div className="w-full px-4 text-center mt-2">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {preferred_authors?.length || 0}
              </span>
              <span className="text-sm text-blueGray-400">Prefered Authors</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                {preferred_sources?.length || 0}
              </span>
              <span className="text-sm text-blueGray-400">Preferred News Sources</span>
            </div>
           
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
          {currentUser?.name}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {`${currentUser?.profile?.city || ''} ${currentUser?.profile?.state || ''} ${currentUser?.profile?.country || ''}`}
        </div>
        <div className="mb-2 text-blueGray-600 mt-3">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          Email - {currentUser?.email || ''}
        </div>
        <div className="mb-2 text-blueGray-600">
          <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
          Phone - {currentUser?.profile?.phone || 'None'}
        </div>
      </div>
      <div className="mt-3 py-5 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-md leading-relaxed text-blueGray-700">
            {currentUser?.profile?.bio || 'None'}
            </p>
          </div>
        </div>
      </div>

</Modal>
</>
  )
}

export default React.memo(Profile)
