import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsButtonLink extends Schema.Component {
  collectionName: 'components_elements_button_links';
  info: {
    displayName: 'Button Link';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
    href: Attribute.String;
  };
}

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    heading: Attribute.String;
    text: Attribute.Text;
    image: Attribute.Media;
    buttonLink: Attribute.Component<'elements.button-link', true>;
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
      'elements.button-link': ElementsButtonLink;
      'elements.link': ElementsLink;
      'layout.hero': LayoutHero;
      'layout.top-nav': LayoutTopNav;
    }
  }
}
