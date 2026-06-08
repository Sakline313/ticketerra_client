// import React from 'react';

const Link = ({ route }) => {
    return (
      
        <li className="my-2 mx-auto w-40 px-4 py-1 rounded-2xl transition-colors duration-300 hover:bg-amber-400 text-blue-700 hover:text-gray-900 list-none">
            <a href={route.path} className="block w-full h-full font-medium text-center">
                {route.name}
            </a>
        </li>
    );
};

export default Link;