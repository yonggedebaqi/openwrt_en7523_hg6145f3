# SPDX-License-Identifier: GPL-2.0-only
include $(TOPDIR)/rules.mk

PKG_NAME:=omcid
PKG_VERSION:=0.1
PKG_RELEASE:=1
PKG_MAINTAINER:=John Crispin <john@phrozen.org>
PKG_LICENSE:=GPL-2.0-only
PKG_LICENSE_FILES:=omcid/CMakeLists.txt
PKG_SOURCE_URL:=https://github.com/blogic/omcid.git
PKG_SOURCE_VERSION:=0c2eaa0b03a0261a3d12ca6f6d59f6d1926cfdab
PKG_SOURCE_PROTO:=git
PKG_MIRROR_HASH:=skip
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

define Package/omcid
  SECTION:=utils
  CATEGORY:=Utilities
  SUBMENU:=Airoha
  TITLE:=ITU-T G.988 userspace OMCI agent for the PON subsystem
  URL:=https://github.com/blogic/omcid
  DEPENDS:=+libpon +libnl-tiny +libubox +libubus +libuci
endef

define Package/omcid/description
 omcid answers the OLT over the OMCI channel of the pon generic netlink
 family, holds the MIB the OLT writes and turns it into the kernel
 objects.  Built from libomci-backend, libomci-apply and the omcid
 daemon, configured through the UCI onu section (LOID/registration id,
 serial number, password).
endef

# Three sibling CMake projects that find each other through installed
# artifacts: configure+build+install them in order into PKG_INSTALL_DIR,
# with the prefix added to CMAKE_OPTIONS so later finds resolve.
OMCID_SUBPROJECTS:=libomci-backend libomci-apply omcid

define Build/Configure
	$(foreach sub,$(OMCID_SUBPROJECTS),\
		$(eval CMAKE_SOURCE_SUBDIR:=$(sub))\
		$(eval CMAKE_BINARY_SUBDIR:=build-$(sub))\
		$(eval CMAKE_OPTIONS:=-DCMAKE_PREFIX_PATH=$(PKG_INSTALL_DIR)/usr -DCMAKE_INSTALL_PREFIX=/usr $(filter-out -DCMAKE_PREFIX_PATH=% -DCMAKE_INSTALL_PREFIX=%,$(CMAKE_OPTIONS)))\
		$(call Build/Configure/Default)\
		$(call Build/Compile/Default)\
		$(call Build/Install/Default)\
	)
endef

define Build/Compile
	@true
endef

define Package/omcid/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(CP) $(PKG_INSTALL_DIR)/usr/sbin/omcid $(1)/usr/sbin/
	$(INSTALL_DIR) $(1)/usr/lib
	$(CP) $(PKG_INSTALL_DIR)/usr/lib/libomci-*.so* $(1)/usr/lib/
endef

define Build/InstallDev
	$(INSTALL_DIR) $(1)/usr/include/libomci-backend $(1)/usr/include/libomci-apply $(1)/usr/lib
	$(CP) $(PKG_INSTALL_DIR)/usr/include/libomci-backend $(1)/usr/include/
	$(CP) $(PKG_INSTALL_DIR)/usr/include/libomci-apply $(1)/usr/include/
	$(CP) $(PKG_INSTALL_DIR)/usr/lib/libomci-*.so* $(1)/usr/lib/
endef

$(eval $(call BuildPackage,omcid))
