import AuthRouter from "../AuthRouter";
import { PATH } from "../config/path";
import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages";
import { Page404 } from "../pages/404";
import { Coin } from "../pages/coin";
import ContactPage from "../pages/contact";
import { Course } from "../pages/course";
import { CourseDetail } from "../pages/course/[slug]";
import { Demo } from "../pages/demo";
import { DemoReact } from "../pages/demo-react";
import { Faq } from "../pages/faq";
import { Payment } from "../pages/payment";

import { Project } from "../pages/project";
import { RegisterPage } from "../pages/register/[slug]-id[id]";
import { ResetPassword } from "../pages/reset-password";
import { Signin } from "../pages/signin";
import { Signup } from "../pages/signup";
import { Team } from "../pages/team";
import { profile } from "./profile";



export const routers = [
    {
        element:<MainLayout />,
        children: [
            {
                element:<Home/>,
                index:true
            },
            {
                element:<Demo/>,
                path:PATH.demo
            },
            {
                element:<DemoReact/>,
                path:PATH.demoReact
            },
            {
                element:<ContactPage/>,
                path:PATH.contact
            },
            {
                path:PATH.course,
                children: [
                    {
                        element:<Course/>,
                        index:true
                    },
                    {
                        element:<CourseDetail/>,
                        path:PATH.courseDetail
                    }
                ]
            },
            {
                element:<RegisterPage/>,
                path:PATH.courseRegister
            },
            {
                element:<Team/>,
                path:PATH.team
            },
            {
                element:<Faq/>,
                path:PATH.faq
            },
            {
                element:<Coin/>,
                path:PATH.coin
            },
            {
                element:<Payment/>,
                path:PATH.payment
            },
            {
                element:<Project/>,
                path:PATH.project
            },
            {
                element:<AuthRouter 
                 redirect={PATH.profile.index}/>,
                children: [
                    {
                        element:<Signin />,
                        path:PATH.signin
                    },
                    {
                        element:<Signup/>,
                        path:PATH.signup
                    },
                    {
                        element:<ResetPassword/>,
                        path:PATH.resetPassWord
                    },

                ]
               
            },
            
            profile()
                // element:<PrivateRouter user={user} redirect={PATH.signin}/>,
                // children:[
                //     {
                //         element:<ProfileLayout user={user}/>,
                //         children:[
                //             {
                //                 element:<Profile/>,
                //                 path:PATH.profile.index,
                //                 index:true
                //             },
                //             {
                //                 element:<Mycourse/>,
                //                 path:PATH.profile.course
                //             },
                //             {
                //                 element:<MyPayment/>,
                //                 path:PATH.profile.payment
                //             },
                //             {
                //                 element:<MyCoin/>,
                //                 path:PATH.profile.coin
                //             },
                //             {
                //                 element:<MyProject/>,
                //                 path:PATH.profile.project
                //             },
                          
                            
                //         ]
                //     }
                // ]
            ,
            {
                element:<Page404/>,
                path:'*'
            }

          
        ]
    }
]
