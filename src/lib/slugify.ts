import { default as baseSlugify } from 'slugify';

baseSlugify.extend({ ў: 'u' });

export const slugify = (value: string) => {
  return baseSlugify(value, {
    strict: true,
    lower: true,
  });
};
