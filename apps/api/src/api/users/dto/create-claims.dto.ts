export class CreateClaimsDto {
  isAdministrator: boolean;
  isModerator: boolean;
  isUser: boolean;
  isSupport: boolean;
  isCustomer: boolean;
  isMerchant: boolean;
  isAffiliate: boolean;
  isPartner: boolean;
  isSubscriber: boolean;
  isManager: boolean;
  isStaff: boolean;
  isDeveloper: boolean;
  isTester: boolean;

  isBlocked: boolean;
  isDisabled: boolean;
  isSuspended: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  isArchived: boolean;

  isVerified: boolean;
  isFeatured: boolean;
  isSponsored: boolean;

  isPublic: boolean;
  isProtected: boolean;
  isPrivate: boolean;
  isHidden: boolean;
}
