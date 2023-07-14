export interface authProps{
auth?:{
       user:{
              
              name?:string,
              email?: string,
              profile?:{
              user_image?:string,
              roles?:number[],
              city?: string,     
              state?: string,     
              country?: string,     
              gender?: string,     
              feeds_preference?:any,     
              },
        }
              accessToken?:string
             
       },
setAuth?:React.Dispatch<any>, 
}

export interface allowedRolesProps{
       allowedRoles:number[]
       
}