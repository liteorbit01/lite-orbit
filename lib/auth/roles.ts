/**
 * Lite Orbit system roles.
 *
 * These values correspond to the `code` column
 * in the `roles` database table.
 */
export const Roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  CUSTOMER_SERVICE: "CUSTOMER_SERVICE",
} as const;

export type Role =
  (typeof Roles)[keyof typeof Roles];