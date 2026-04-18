export interface ILoginResponse {
    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        needPasswordChange : boolean;
        email : string;
        name : string;
        role : string;
        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  needPasswordChange: boolean;
  image: string;
  status: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  phone: string;
}