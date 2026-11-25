/* SPDX-License-Identifier: GPL-2.0-only WITH Linux-syscall-note */
/*
 * linux/pon_link.h - rtnetlink attributes of the PON "gem"/"mapper"
 * link kinds.
 *
 * Reverse-engineered uapi header reconstructed from the
 * blogic/pon-tool libpon/link.c and blogic/omcid libomci-apply/link.c
 * consumers.  These attributes travel inside IFLA_INFO_DATA of a
 * RTM_NEWLINK request whose IFLA_INFO_KIND is a PON link type.
 */
#ifndef PON_LINK_UAPI_INCLUDE
#define PON_LINK_UAPI_INCLUDE

#include <linux/types.h>

/* IFLA_INFO_DATA attributes of the "gem" link kind */
enum {
	IFLA_GEM_UNSPEC,
	IFLA_GEM_ID,		/* __u32 GEM port id */
	__IFLA_GEM_MAX,
};
#define IFLA_GEM_MAX (__IFLA_GEM_MAX - 1)

#endif /* PON_LINK_UAPI_INCLUDE */
