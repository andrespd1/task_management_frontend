import { redirect } from "next/navigation";
import LoginPage from "./pages/login/page";

export default function Home() {
  
  redirect('/pages/login')
  return ( 
    <>
    </>
   );
}
