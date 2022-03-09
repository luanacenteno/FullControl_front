
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
        },
        {
            text: 'Tablero',
            link: '/auditorias'
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


export const menu = [
    Home,
    Auditorias,
    Users,

];
