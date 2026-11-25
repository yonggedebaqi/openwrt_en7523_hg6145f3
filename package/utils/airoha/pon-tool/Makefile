# SPDX-License-Identifier: GPL-2.0-only
include $(TOPDIR)/rules.mk

PKG_NAME:=pon-tool
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

define Package/pon-tool
  SECTION:=utils
  CATEGORY:=Utilities
  SUBMENU:=Airoha
  TITLE:=PON device management CLI (libpon frontend)
  URL:=https://github.com/blogic/pon-tool
  DEPENDS:=+libpon +omcid +libnl-tiny
endef

CMAKE_SOURCE_SUBDIR:=pon-tool
# The reconstructed uapi headers live in the kernel tree via target
# files/include; the CLI resolves them through LINUX_DIR.
CMAKE_OPTIONS += -DPON_UAPI_INCLUDE=$(LINUX_DIR)/include/uapi

define Package/pon-tool/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(CP) $(PKG_INSTALL_DIR)/usr/sbin/* $(1)/usr/sbin/ 2>/dev/null || true
	$(INSTALL_DIR) $(1)/usr/bin
	$(CP) $(PKG_INSTALL_DIR)/usr/bin/* $(1)/usr/bin/ 2>/dev/null || true
endef

$(eval $(call BuildPackage,pon-tool))
