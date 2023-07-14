
 interface userInterface{
    user:{
     id:string | undefined;
     name: string | undefined;
     email: string | undefined;
     gender: string | undefined;
     city: string | undefined;
     state: string | undefined;
     country: string | undefined;
     user_image: string | undefined;
     account_status:string | number | null |undefined;
     roles:  {
         User: number | null |undefined;
         Admin?: number | undefined | null;
         Dev?: number | undefined | null;
         Staff?: number | undefined | null;
     } | null | undefined;
     createdAt?:Date;
     updatedAt?:Date;
    }
 }
 export default userInterface