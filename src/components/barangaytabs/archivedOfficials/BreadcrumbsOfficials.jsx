import React from 'react';

const BreadcrumbsOfficials = () => {
  return (
    <nav className="flex ">
      <ol className="flex items-center space-x-2 text-gray-500 mt-[-1rem]">
        <li>
        <button
            type="button"
            class="text-xs md:text-md"
            id="basic-tabs-item-2"
            data-hs-tab="#basic-tabs-2"
            aria-controls="basic-tabs-2"
            role="tab"
          >
            BARANGAY OFFICIALS
          </button>
        </li>
        <li>
          <span>/</span>
        </li>
        <li className="text-xs md:text-md text-teal-600">ARCHIVED OFFICIALS</li>
      </ol>
    </nav>
  );
};

export default BreadcrumbsOfficials;
