# SPDX-License-Identifier: GPL-2.0-only
include $(TOPDIR)/rules.mk

PKG_NAME:=xg140g-pon
PKG_VERSION:=1.0
PKG_RELEASE:=1
PKG_LICENSE:=GPL-2.0-only

include $(INCLUDE_DIR)/package.mk

define Package/xg140g-pon
  SECTION:=utils
  CATEGORY:=Utilities
  SUBMENU:=Airoha
  TITLE:=PON provisioning scripts (LOID identity, mode select, calibration)
  URL:=https://github.com/blogic/omcid
  DEPENDS:=+omcid
endef

define Package/xg140g-pon/description
 UCI onu section (LOID <=24 chars, password <=12), the omcid procd
 units, mode select, WAN gate, MAC apply and factory calibration
 scripts extracted from the R1.5.6 native-ubi build.  Hardware probes
 for EN7523 remain to be verified on the target.
endef

define Package/xg140g-pon/install
	$(CP) ./files/. $(1)/
endef

$(eval $(call BuildPackage,xg140g-pon))
