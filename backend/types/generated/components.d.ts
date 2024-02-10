import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
    isExternal: Attribute.Boolean;
  };
}

export interface LayoutTopNav extends Schema.Component {
  collectionName: 'components_layout_top_navs';
  info: {
    displayName: 'TopNav';
    description: '';
  };
  attributes: {
    logoLink: Attribute.Component<'elements.link'>;
    navItem: Attribute.Component<'elements.link', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.link': ElementsLink;
      'layout.top-nav': LayoutTopNav;
    }
  }
}
