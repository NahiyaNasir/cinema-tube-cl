


import HomeClient from "@/src/components/Home/HomeClient";

import { getUserInfo } from "@/src/service/auth.service";





export default async  function Home() {
    const user = await getUserInfo();

  return (
    <div>
    
      <HomeClient user={user}></HomeClient>


    </div>
  );
}