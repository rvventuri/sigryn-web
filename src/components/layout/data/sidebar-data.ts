import {
  LayoutDashboard,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Send,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          title: 'Destinations',
          url: '/destinations',
          icon: Send,
        },
        // {
        //   title: 'Settings',
        //   icon: Settings,
        //   items: [
        //     {
        //       title: 'Profile',
        //       url: '/settings',
        //       icon: UserCog,
        //     },
        //     {
        //       title: 'Account',
        //       url: '/settings/account',
        //       icon: Wrench,
        //     },
        //     {
        //       title: 'Appearance',
        //       url: '/settings/appearance',
        //       icon: Palette,
        //     },
        //     {
        //       title: 'Notifications',
        //       url: '/settings/notifications',
        //       icon: Bell,
        //     },
        //     {
        //       title: 'Display',
        //       url: '/settings/display',
        //       icon: Monitor,
        //     },
        //   ],
        // },
      ],
    },
  ],
}
