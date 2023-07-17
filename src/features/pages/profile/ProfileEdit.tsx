import React,{useEffect,useState,ChangeEvent,FormEvent} from 'react'
import Modal from '../../../components/Modal';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../auth/authSlice'
import useUserImage from '../../../app/utils/hooks/useUserImage'
import { useUpdateProfileMutation } from './profileApiSlice'
import showToast from '../../../app/utils/hooks/showToast'


// requires atleast 0ne uppercase, lowercase,digit, special character and a total of 8 t0 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface IProfileEdit{
    showEditProfile:boolean;
    setShowEditProfile:React.SetStateAction<any>
}
interface UserData {
  email: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  gender: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  bio: string | undefined;
  password?: string | undefined;
  password_confirmation?: string | undefined;
  user_image?: string | undefined;
}



const ProfileEdit = ({showEditProfile,setShowEditProfile}:IProfileEdit) => {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
    
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [email, setEmail] = useState<any>(currentUser.email)
   const [fullName, setFullName] = useState<any>(currentUser.name)
   const [phone, setPhone] = useState<any>(currentUser?.profile?.phone)
   const [previewImage, setPreviewImage] = useState("");
   const [userProfileImage, setUserProfileImage] = useState<any>("");
   const [gender, setGender] = useState<any>(currentUser?.profile?.gender)

   const [city, setCity] = useState<any>(currentUser?.profile?.city)
   const [state, setState] = useState<any>(currentUser?.profile?.state)
   const [country, setCountry] = useState<any>(currentUser?.profile?.country)
   const [bio, setBio] = useState<any>(currentUser?.profile?.bio)
   
   const [validMatch,setValidMatch] = useState(false);
   const [validPwd,setValidPwd] = useState(false);

const [updateProfile, {
    isLoading,
    isSuccess,
    isError,
    error:updateProfileError
}]:any = useUpdateProfileMutation()
 
const genderOptions = ['male','female'].map((userGender,i)=>(<option key={i} value={userGender}>{userGender.toUpperCase()}</option>))
useEffect(()=>{
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === confirmPassword && password !== "";
    setValidMatch(match)
}, [password,confirmPassword]);

const uploadUserImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files
    if(file && file.length > 0)
    {setUserProfileImage(file[0])
  const fileurl = (window.URL || window.webkitURL).createObjectURL(file[0]);
  setPreviewImage(fileurl)
  
  }}

const updateUserProfile = async(e:FormEvent)=>{
e.preventDefault()
let data:UserData = { email, name: fullName, phone, gender, city, state, country, bio };
// Check if there is a valid password match
if (validMatch) {
  data = { ...data, password, password_confirmation: confirmPassword };
}
// Check if there is a userProfileImage
if (userProfileImage) {
  data = { ...data, user_image: userProfileImage };
}
const formData = new FormData();
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('city',city);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('gender', gender);
    formData.append('bio', bio);

console.log(formData)
try{
await updateProfile(formData).unwrap()
if(isError)return showToast('error',updateProfileError?.data?.message)
showToast('success', 'Profile updated successfully!')
}catch(error:any){
    console.log(error)
showToast('error',error?.data?.message)
}

}

  return (

<>
<Modal isVisible={showEditProfile} onClose={()=>setShowEditProfile(false)}>
  
  
<form  onSubmit={updateUserProfile}> 
<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Personal Information
                </h3>
               
            </div>
<div className="flex flex-col overflow-y-auto p-6 scrollbar overscroll-contain transition-all duration-200 ease-in-out h-[calc(100vh-10rem)]">
 <div className="mb-6">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={fullName}
            onChange={(e)=> setFullName(e.target.value)}
            placeholder="Full Name" required />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
    <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required 
         value={email} 
        //  ref={emailRef}
        //  onBlur={()=>checkEmail(email!)}
         onChange={(e)=> setEmail(e.target.value)} />
    </div> 
        <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  value={phone} 
             onChange={(e)=> setPhone(e.target.value)} />
             {/* pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" */}
        </div>
        <div>
        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender select</label>
            <select id="gender" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={gender}  onChange={(e)=> setGender(e.target.value)}>
            <option selected>Select ...</option>
            {genderOptions}
            </select>
     </div>
        <div>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City"
            value={city} 
            onChange={(e)=> setCity(e.target.value)} />
        </div>  
        <div>
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
            <input type="text" id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="state"
            value={state} 
            onChange={(e)=> setState(e.target.value)} />
        </div>
        <div>
            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
            <input type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
             value={country} 
             onChange={(e)=> setCountry(e.target.value)}/>
        </div>
        
      <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col p-5 items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept=".png, .jpg, .jpeg"   onChange={uploadUserImage} />
    </label>
</div> 
  
        <div>
        <div id="preview">{previewImage &&<img className="img-responsive" src={previewImage} alt="post cover imager" width="240"/>}</div>
        </div>
    </div>
    
    <div className="mb-6">     
        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your bio</label>
        <textarea id="bio" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
          onChange={(e)=> setBio(e.target.value)}>{bio}</textarea>
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"
         onChange={(e)=> setPassword(e.target.value)} />
    </div> 
    <div className="mb-6">
        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" onChange={(e)=> setConfirmPassword(e.target.value)}
         />
    </div> 
   
    <button type="submit" className="place-self-end  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
</div></form>


</Modal>
</>
  )
}

export default React.memo(ProfileEdit)
