
import { offerBase } from './offerBase';
import { offerProducts } from './offerProducts';
import { offerTemplates } from './offerTemplates';
import { offerStatus } from './offerStatus';
import { offerDraft } from './offerDraft';
import { offerPreview } from './offerPreview';

// Combine all offer translation sections
export const offer = {
  ...offerBase,
  ...offerProducts,
  ...offerTemplates,
  ...offerStatus,
  ...offerDraft,
  offerPreview // Export the offerPreview object as a nested property
};
