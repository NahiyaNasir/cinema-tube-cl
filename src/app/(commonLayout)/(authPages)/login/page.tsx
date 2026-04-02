import LoginForm from "@/src/components/modules/auth/login-from"
interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}


const LoginPage = async ({ searchParams }: LoginPageProps) => {
   const params = await searchParams;
  const redirectUrl = params.redirect;
 
  return (
    <LoginForm redirectPath={redirectUrl}/>
  
  )
}

export default LoginPage