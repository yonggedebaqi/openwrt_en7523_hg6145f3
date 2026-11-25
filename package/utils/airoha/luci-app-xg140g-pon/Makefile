# SPDX-License-Identifier: GPL-2.0-only
include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-xg140g-pon
PKG_VERSION:=1.0
PKG_RELEASE:=1
PKG_LICENSE:=GPL-2.0-only

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-xg140g-pon
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=PON management web interface (LOID/registration)
  DEPENDS:=+luci-base +xg140g-pon
endef

define Package/luci-app-xg140g-pon/install
	$(CP) ./files/. $(1)/
endef

$(eval $(call BuildPackage,luci-app-xg140g-pon))
