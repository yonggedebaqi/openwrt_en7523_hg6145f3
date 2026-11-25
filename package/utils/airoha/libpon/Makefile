# SPDX-License-Identifier: GPL-2.0-only
include $(TOPDIR)/rules.mk

PKG_NAME:=libpon
PKG_VERSION:=0.1
PKG_RELEASE:=1
PKG_MAINTAINER:=John Crispin <john@phrozen.org>
PKG_LICENSE:=LGPL-2.1-only
PKG_SOURCE_URL:=https://github.com/blogic/pon-tool.git
PKG_SOURCE_VERSION:=690b0cff7e8790c6c31ebe9cceba73177bda7bb2
PKG_SOURCE_PROTO:=git
PKG_MIRROR_HASH:=skip
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

define Package/libpon
  SECTION:=libs
  CATEGORY:=Libraries
  SUBMENU:=Airoha
  TITLE:=PON generic netlink client library
  URL:=https://github.com/blogic/pon-tool
  DEPENDS:=+libnl-tiny
endef

define Package/libpon/description
 Userspace client library for the Linux PON (pon) generic netlink
 family used by omcid and pon-tool.  Reconstructed together with
 target/linux/airoha/files/include/uapi/linux/pon.h.
endef

CMAKE_SOURCE_SUBDIR:=libpon

define Package/libpon/install
	$(INSTALL_DIR) $(1)/usr/lib
	$(CP) $(PKG_INSTALL_DIR)/usr/lib/libpon.so* $(1)/usr/lib/
endef

define Build/InstallDev
	$(INSTALL_DIR) $(1)/usr/include/libpon $(1)/usr/lib
	$(CP) $(PKG_INSTALL_DIR)/usr/include/libpon $(1)/usr/include/
	$(CP) $(PKG_INSTALL_DIR)/usr/lib/libpon.so* $(1)/usr/lib/
endef

$(eval $(call BuildPackage,libpon))
