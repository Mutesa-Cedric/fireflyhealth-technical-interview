import React from 'react'
import { CalendarToday, ControlPoint } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Box, Link } from '@mui/material';

const sidebarLinks = [
    {
        label: 'Appointments',
        icon: CalendarToday,
        href: '/appointments',
    },
    {
        label: 'Book Appointments',
        icon: ControlPoint,
        href: '/appointments/new',
    }
]

const Sidebar = () => {
    const location = useLocation();

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
        >
            {sidebarLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    underline={location.pathname === link.href ? 'always' : 'hover'}
                    color={location.pathname === link.href ? 'primary' : 'inherit'}
                    display={'flex'} alignItems={'center'} p={1}
                >
                    <link.icon />
                    <span style={{ marginLeft: '8px' }}>{link.label}</span>
                </Link>
            ))}

        </Box>
    )
}


export default Sidebar;