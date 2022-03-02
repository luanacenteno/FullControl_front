
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Auditorias = {
    text: 'Auditorias',
    link: '/auditorias',
    icon: 'icon-note',
    submenu: [
        {
            text: 'Bromatologia',
            link: '/auditorias/bromatologia'
        }
    ]
};

const Users = {
    text: 'Users',
    link: '/users',
    icon: 'fas fa-user',
    submenu: [
        {
            text: 'Crear',
            link: '/users/crear'
        },
        {
            text: 'Listar',
            link: '/users/listar'
        }
    ]
};

/*const Calendario = {
    text: 'Calendario',
    link: '/calendario',
    icon: 'icon-notebook'
};

const Dashboard = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Dashbord v1',
            link: '/dashboard/v1'
        },
        {
            text: 'Dashbord v2',
            link: '/dashboard/v2'
        },
        {
            text: 'Dashbord v3',
            link: '/dashboard/v3'
        }
    ]
};
*/
const Forms = {
    text: 'Forms',
    link: '/forms',
    icon: 'icon-note',
    submenu: [
        {
            text: 'Standard',
            link: '/forms/standard'
        },
        {
            text: 'Extended',
            link: '/forms/extended'
        },
        {
            text: 'Validation',
            link: '/forms/validation'
        },
        {
            text: 'Upload',
            link: '/forms/upload'
        },
        {
            text: 'Image Crop',
            link: '/forms/cropper'
        }
    ]
};

/*const Charts = {
    text: 'Charts',
    link: '/charts',
    icon: 'icon-graph',
    submenu: [
        {
            text: 'Flot',
            link: '/charts/flot'
        },
        {
            text: 'Radial',
            link: '/charts/radial'
        },
        {
            text: 'ChartJS',
            link: '/charts/chartjs'
        }
    ]
};

const Pages = {
    text: 'Pages',
    link: '/pages',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Login',
            link: '/login'
        },
        {
            text: 'Register',
            link: '/register'
        },
        {
            text: 'Recover',
            link: '/recover'
        },
        {
            text: 'Lock',
            link: '/lock'
        },
        {
            text: '404',
            link: '/404'
        },
        {
            text: '500',
            link: '/500'
        },
        {
            text: 'Maintenance',
            link: '/maintenance'
        }
    ]
};

const headingMain = {
    text: 'Main Navigation',
    heading: true
};*/

export const menu = [
    //headingMain,
    Home,
    Auditorias,
    Users,
    //Calendario,
    //Dashboard,
    Forms,
    //Charts,
    //Pages
];
