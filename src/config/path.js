const PROFILE_PATH ='/profile'
const COURSE_PATH ='/course'


export const PATH = {
    home:'/',
    team:'/team',
    demo:'/demo',
    demoReact:'/demo-react',
    course:COURSE_PATH,
    courseDetail:COURSE_PATH+ '/:slug-id:id',
    courseRegister:'/register/:slug-id:id',

    project:'/project',
    coin:'/coin',
    contact:'/contact',
    faq:'/faq',
    signin:'/signin',
    signup:'/signup',
    payment:'/payment',
    resetPassWord:'/reset-password',
    profile:{
        index:PROFILE_PATH,
        course:PROFILE_PATH+'/course',
        coin:PROFILE_PATH+'/coin',
        payment:PROFILE_PATH+'/payment',
        project:PROFILE_PATH+'/project',

    }

}