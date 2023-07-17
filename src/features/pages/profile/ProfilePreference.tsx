import React,{useEffect,useState,FormEvent} from 'react'
import Modal from '../../../components/Modal';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../auth/authSlice'
import useUserImage from '../../../app/utils/hooks/useUserImage'
import { useUpdateProfileMutation ,useUpdateProfilePreferenceMutation } from './profileApiSlice'
import showToast from '../../../app/utils/hooks/showToast'
import { useGetArticlesQuery } from '../dashboard/articlesApiSlice';
import AuthorsList from './components/AuthorsList';
import SourcesList from './components/SourcesList';




interface IProfilePreference{
    showProfilePreference:boolean;
    setShowProfilePreference:React.SetStateAction<any>
}



const ProfilePreference = ({showProfilePreference,setShowProfilePreference}:IProfilePreference) => {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
   const [preferredAuthors, setPreferredAuthors] = useState<string[]>([])
   const [preferredSources, setPreferredSources] = useState<string[]>([])
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
} = useGetArticlesQuery(1)

const updateUserProfile = async(e:FormEvent)=>{
    e.preventDefault()
        let data={preferredSources, preferredAuthors}
         console.log(data)
    try{
    await updateProfilePreference(data).unwrap()
    if(isError)return showToast('error',updateProfileError?.data?.message)
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
const sources = [...new Set(articles.map((a:any)=>a.attributes.source_name))] as string[]
const authors = [...new Set(articles.map((a:any)=>a.attributes.author))] as string[]


  // Add/Remove checked item from list
  const handlePreferredAuthorsCheck = (event:any) => {
    var updatedList = [...preferredAuthors];
    if (event.target.value!) {
      updatedList = [...preferredAuthors, event?.target?.value!];
    } else {
      updatedList.splice(preferredAuthors.indexOf(event?.target?.value!), 1);
    }
    setPreferredAuthors(updatedList);
  };
  const handlePreferredSourcesCheck = (event:any) => {
    var updatedList = [...preferredSources];
    if (event.target.value!) {
      updatedList = [...preferredSources, event?.target?.value!];
    } else {
      updatedList.splice(preferredSources.indexOf(event?.target?.value!), 1);
    }
    setPreferredSources(updatedList);
  };

    console.log(currentUser.profile.feeds_preferences)
  return (

<>
<Modal isVisible={showProfilePreference} onClose={()=>setShowProfilePreference(false)} size='700px'>
  
  
<form className="flex flex-col text-center md:px-[70px]" onSubmit={updateUserProfile}>
<div className="flex items-start justify-between p-4 m-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Feeds Preference
                </h3>
               
            </div>
    <div className="grid gap-6 mb-6 sm:grid-cols-1 md:grid-cols-2">
            <div>
                    
<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose Authors:</h3>
            <ul className="grid w-full gap-6 md:grid-cols-1 overflow-y-auto over h-[400px] px-5 scrollbar scroll-m-4  scrollbar overscroll-contain transition-all duration-200 ease-in-out">
               {authors?.map((author:string,i:number)=><AuthorsList key={i} author={author} i={i} handlePreferredAuthorsCheck={handlePreferredAuthorsCheck}/>)}
              
            </ul>
        </div>
            <div> 
                 
            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose Sources:</h3>
            <ul className="grid w-full gap-6 md:grid-cols-1 overflow-y-auto h-[400px] px-5 scrollbar scroll-m-4 scroll-thin  scrollbar overscroll-contain transition-all duration-200 ease-in-out">
               {sources?.map((source:string,i:number)=><SourcesList key={i} source={source} i={i} handlePreferredSourcesCheck={handlePreferredSourcesCheck} />)}
              
            </ul>
             </div>

      </div>
    <button type="submit" className=" place-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>


</Modal>
</>
  )
}

export default React.memo(ProfilePreference)
