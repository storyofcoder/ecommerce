const errorlang = {
  INVALID_OTP: 'INVALID OTP',

  UNKNOWN: 'Something went wrong, please try again',
  PRODUCT_NOT_FOUND: 'Product not found.',
  UNDEFINED_DATA: 'Undefined data',
  NO_DATA_FOUND: 'No data found',
  NO_EMAIL_FOUND: 'No active account is associated with this email id.',
  NOT_VALID_USER: 'Could not find a valid user',
  REQUIRED_FIELD_MISSING: 'Required field is missing',
  FIELD_NOT_EDITABLE: 'Some of fields are not editable',
  ALREADY_WISHLIST: 'This product is already added in your wishlist.',
  ALREADY_CART: 'This product is already added in your Cart.',
  WISHLIST_NOT_FOUND: 'This product is not found in wishlist.',
  SMS_2FA_NOT_SUPPORTED: 'We are not supporting SMS 2 step authentication',
  PASSWORD_LENGTH: `Password is too short`,
  EMAIL_ALREADY_EXIST: `Email already exist`,
  EMAIL_NOT_VERIFIED: `Please verify your email address`,
  WRONG_CREDENTIALS: `Invalid email or password`,
  INVALID_OAUTH_CODE: `Invalid auth code`,
  LINK_EXPIRED: `Link Expired`,
  USER_NOT_EXITS:  `User Does not exist`,
  ACCOUNT_DISABLED: `Your account has been disabled. Please contact our support`,
}

module.exports = {
  errorlang
}
