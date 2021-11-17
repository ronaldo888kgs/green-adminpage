import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Sort by',
    path: '#',
    // icon: <AiIcons.AiFillHome />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    type: 'button',

    subNav: [
      {
        title: 'Recent',
        path: 'recent',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Most Viewed',
        path: 'mostviewed',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Most Liked',
        path: 'mostliked',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'On Auction',
        path: 'onauction',
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Price',
    path: '#',
    // icon: <IoIcons.IoIosPaper />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    type: 'button',
    subNav: [
      {
        title: '<1ETH',
        path: '1eth',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: '<10ETH',
        path: '10eth',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: '<100ETH',
        path: '100eth',
        // icon: <IoIcons.IoIosPaper />
      },
      {
        title: '<1000ETH',
        path: '1000eth',
        // icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Collections',
    path: '#',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    type: 'search',
    subNav: []
  },
  {
    title: 'Categories',
    path: '#',
    icon: <IoIcons.IoMdHelpCircle />,
    
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    type: 'none',
    subNav: [
      {
        title: 'Image',
        path: '#',
        icon: <IoIcons.IoIosImages />
      },
      {
        title: 'Music',
        path: '#',
        icon: <IoIcons.IoIosMusicalNotes />
      }
    ]
  }
];