import React,{useEffect,useState} from 'react'
import Modal from '../../../components/Modal';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../auth/authSlice'
import useUserImage from '../../../app/utils/hooks/useUserImage'
import { useUpdateProfileMutation ,useUpdateProfilePreferenceMutation } from './profileApiSlice'
import showToast from '../../../app/utils/hooks/showToast'
import { useGetArticlesQuery } from '../dashboard/articlesApiSlice';




interface IProfilePreference{
    showProfilePreference:boolean;
    setShowProfilePreference:React.SetStateAction<any>
}



const ProfilePrefernce = ({showProfilePreference,setShowProfilePreference}:IProfilePreference) => {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
   const [preferredAuthors, setPreferredAuthors] = useState()
   const [preferredSource, setPreferredSource] = useState()
   const [updateProfilePreference, {
    error:updateProfileError
}]:any = useUpdateProfilePreferenceMutation()
       const [articles, setArticles] = useState<any>([]);
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetArticlesQuery('articlesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

const updateUserProfile = async(e:FormEvent)=>{
    e.preventDefault()
        let data={preferredSource, preferredAuthors}
         
    try{
    await updateProfilePreference({id:currentUser.id,data}).unwrap()
    if(isError)return showToast('error',updateUserError?.data?.message)
    showToast('success', 'Profile updated successfully!')
    }catch(error){
        console.log(error)
    }
    
    }
useEffect(()=>{
if(isSuccess && !isLoading){
  // console.log()
  setArticles(Object.values(data)[0])
}
},[])
const sources = [... new Set(articles.map((a:any)=>a.attributes.source_name))]
const authors = [... new Set(articles.map((a:any)=>a.attributes.author))]
console.log(sources)
console.log(authors)
// console.log(articles)
  return (

<>
<Modal isVisible={showProfilePreference} onClose={()=>setShowProfilePreference(false)} size={'90%'}>
  
  
<form className="flex flex-col" onSubmit={updateUserProfile}>
    <div className="grid gap-6 mb-6 md:grid-cols-2">

      </div>
    <button type="submit" className=" place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


</Modal>
</>
  )
}

export default React.memo(ProfilePrefernce)
