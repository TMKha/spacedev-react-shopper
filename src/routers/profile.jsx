import { Profile } from "../pages/profile";
import { MyCoin } from "../pages/profile/coin";
import { Mycourse } from "../pages/profile/course";
import { MyPayment } from "../pages/profile/payment";
import { MyProject } from "../pages/profile/project";
import { ProfileLayout } from "../layouts/ProfileLayout";
import PrivateRouter from "../components/PrivateRouter";
import { PATH } from "../config/path";
import { useAuth } from "../components/AuthContext";


export const profile =() =>{

    return {
        element:<PrivateRouter redirect={PATH.signin}/>,
        children:[
            {
                element:<ProfileLayout  />,
                children:[
                    {
                        element:<Profile/>,
                        path:PATH.profile.index,
                        index:true
                    },
                    {
                        element:<Mycourse/>,
                        path:PATH.profile.course
                    },
                    {
                        element:<MyPayment/>,
                        path:PATH.profile.payment
                    },
                    {
                        element:<MyCoin/>,
                        path:PATH.profile.coin
                    },
                    {
                        element:<MyProject/>,
                        path:PATH.profile.project
                    },
                  
                    
                ]
            }
        ]
    }
}