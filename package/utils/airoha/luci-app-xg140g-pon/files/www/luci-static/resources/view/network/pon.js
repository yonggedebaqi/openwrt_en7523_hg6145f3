'use strict';'require dom';'require poll';'require rpc';'require request';'require ui';'require uci';'require view';'require pon.diagnostics as ponDiagnostics';'require pon.mode as ponMode';var CFG='xg140g-pon';var SID='onu';var ZH={'1G EPON (IEEE 802.3ah)':'1G EPON（IEEE 802.3ah）','1.25G down / 1.25G up (IEEE 802.3ah)':'下行 1.25G / 上行 1.25G（IEEE 802.3ah）','10G down / 1G up, asymmetric':'下行 10G / 上行 1G，非对称','10G down / 10G up, symmetric':'下行 10G / 上行 10G，对称','10G PON MAC in 1G compatible mode':'10G PON MAC，1G 兼容模式','10G down / 2.5G up (ITU-T G.987)':'下行 10G / 上行 2.5G（ITU-T G.987）','10G down / 10G up (ITU-T G.9807)':'下行 10G / 上行 10G（ITU-T G.9807）','PON core / interrupt driver':'PON 核心/中断驱动','Packet buffer manager':'报文缓冲管理','WAN QDMA data path':'WAN QDMA 数据通路','SoC PON MAC driver':'SoC PON MAC 驱动','10G PON MAC':'10G PON MAC','10G PON PHY':'10G PON PHY','Show or hide the entered value':'显示/隐藏输入值','Hide':'隐藏','Show':'显示','PON Management':'PON 管理','Waiting for status…':'等待状态…','Unknown':'未知','Status query failed':'状态查询失败','Could not read the PON status via ubus: %s':'无法通过 ubus 读取 PON 状态：%s','Status unavailable · retrying every 5 s':'状态不可用 · 每 5 秒重试','Last update: %s · auto refresh 5 s':'最近更新：%s · 每 5 秒刷新','Link overview':'链路概览','Operation mode':'模式编号','PON interface':'PON 网口','Registration':'注册状态','PON daemon':'PON 进程','No PON netdev exposed by the driver':'驱动未提供 PON 网口','Not present':'不存在','Waiting':'等待中','operstate: %s':'链路状态：%s','Unknown error':'未知错误','Invalid PON status payload':'PON 状态数据无效','Status update temporarily unavailable; showing last valid state: %s':'刷新失败，显示上次状态：%s','Last valid update: %s · retrying every 5 s':'最近有效更新：%s · 每 5 秒重试','MPCP registered':'MPCP 已注册','MPCP registering':'MPCP 注册中','MPCP not available':'MPCP 不可用','PLOAM / OMCI registered':'PLOAM / OMCI 已注册','PLOAM / OMCI registering':'PLOAM / OMCI 注册中','PLOAM / OMCI not available':'PLOAM / OMCI 不可用','state: %s':'状态：%s','MPCP state %s':'MPCP 状态 %s','MPCP denied; retry in %s s':'MPCP 被拒绝；剩余退避 %s 秒','LOID auth passed':'LOID 认证已通过','LOID auth pending':'LOID 认证未完成','OMCI auth passed':'OMCI 认证已通过','OMCI auth pending':'OMCI 认证未完成','Running':'运行中','Stopped':'已停止','None':'无','PON driver modules':'PON 驱动模块','Loaded':'已加载','Missing':'缺失','Module state unknown':'模块状态未知','%d of %d modules loaded':'已加载 %d/%d 个模块','%d driver module(s) missing':'缺少 %d 个驱动模块','PON identity configuration':'PON 身份配置','Current protocol':'当前协议','Generate a locally administered unicast address':'生成本地管理单播地址','Generated a random locally administered PON MAC address.':'已生成随机本地管理 PON MAC。','Generate':'随机生成','MAC address':'MAC 地址','LOID':'LOID','LOID password':'LOID 密码','Serial number':'SN','Registration ID':'Registration ID','PON identity':'PON 身份','No unsaved changes.':'没有未保存的修改。','Unsaved changes are pending.':'有未保存的修改。','Revert':'撤销','Save configuration':'保存配置','Save & apply':'保存并应用','Saving and applying…':'正在保存并应用…','Saving configuration…':'正在保存配置…','Working…':'处理中…','PON MAC changes are applied to the live PON interface without a reboot.':'PON MAC 修改会直接应用到运行中的 PON 接口，无需重启。','Activity':'本页操作记录','No activity recorded yet.':'暂无操作记录。','Clear PPPoE AC MAC':'清除 PPPoE AC MAC','Clearing PPPoE AC MAC…':'正在清除 PPPoE AC MAC…','No ac_mac pin found on wan/wan6; nothing to clear.':'wan/wan6 未发现 ac_mac 绑定，无需清除。','Cleared ac_mac on %s and reconnected.':'已清除 %s 的 ac_mac 并重连。','Failed to clear the PPPoE AC MAC.':'清除 PPPoE AC MAC 失败。','Form values restored from the saved configuration.':'已恢复为已保存的配置。','Unsaved changes have been discarded.':'已放弃未保存的修改。','The configuration was not saved: %d field(s) contain invalid values. Please check the highlighted inputs.':'配置未保存：%d 个字段无效，请检查红色提示。','Validation failed for %d field(s); nothing was written.':'%d 个字段校验失败，未写入配置。','The device rejected the configuration commit (config_commit returned failure).':'设备拒绝提交配置（config_commit 返回失败）。','Configuration committed to uci (%s). Current protocol: %s.':'配置已提交到 UCI（%s）；当前协议：%s。','Identity fields updated: %s':'已更新身份字段：%s','No identity field changed, runtime reload skipped.':'身份字段未修改，跳过运行时加载。','Runtime reload failed.':'运行时加载失败。','Runtime reload failed: %s':'运行时加载失败：%s','Runtime reload warning: %s':'运行时加载警告：%s','Adaptive detector restart failed; retry when the service is available.':'自适应服务重启失败。','PON identity reloaded at runtime. Active protocol: %s':'PON 身份已运行时加载；协议：%s','The PON configuration has been saved.':'PON 配置已保存。','The PON identity was reloaded at runtime. Registration may briefly show a waiting state.':'身份已应用，正在重新注册。','The PON operation failed.':'PON 操作失败。','PON status loaded.':'PON 状态已加载。','Initial status query failed: %s':'首次状态查询失败：%s','All checks passed':'PON 注册与驱动正常','Operational':'PON 已注册','Degraded':'异常','MPCP registration still pending':'MPCP 注册仍在等待','PLOAM / OMCI registration still pending':'PLOAM / OMCI 注册仍在等待','PON interface missing':'PON 网口缺失','PON daemon not running':'PON 进程未运行','No status data':'没有状态数据','Protocol not recognised':'未知协议','Configured protocol':'配置协议','Detected protocol':'识别结果','Not yet identified':'尚未识别','Waiting for frame synchronization':'等待下行帧同步','Switching protocol':'正在切换协议','Running: %s · target: %s':'当前运行：%s · 目标：%s','Protocol switch in progress':'协议切换进行中','Configured: %s · probing %s':'已配置：%s · 正在探测：%s','Configured: %s':'配置模式：%s','Detection: family only':'检测结果：仅协议族','Family: %s':'协议族：%s','GPON family':'ITU-T PON 协议族（GPON/XG-PON/XGS-PON）','EPON family':'EPON 协议族（EPON/10G-EPON）','Interface enabled':'接口已启用','Carrier detected':'检测到载波','Carrier not reported':'未上报载波状态','Registration state unknown':'注册状态未知','Registration state is not exposed by this interface.':'当前接口未提供注册状态。','GPON family detected':'已识别 GPON 协议族','GPON family evidence only':'等待 PON 认证','EPON family detected':'已识别 EPON 协议族','EPON family evidence only':'等待 LOID/OAM 认证','Protocol switching; registration is temporarily unavailable.':'协议切换中；注册状态暂时不可用。','XG-PON profile':'XG-PON 配置档','XGS-PON profile':'XGS-PON 配置档','GPON profile':'GPON 配置档','EPON profile':'EPON 配置档','XEPON profile':'XEPON 配置档','运行中（注册状态未知）':'运行中（注册状态未知）','驱动、网口和管理进程正常；当前接口未上报 GPON 注册状态。':'驱动、网口和管理进程正常；当前接口未上报 GPON 注册状态。'};function _(text){return Object.prototype.hasOwnProperty.call(ZH,text)?ZH[text]:text;}
var IDENTITY_KEYS=['ethaddr','loid','password','gpon_sn','gpon_regid','ploam_password'];var PROTOCOLS=[{mode:'1',name:'GPON',family:'gpon',hint:'2.488G 下行 / 1.244G 上行 (ITU-T G.984)'},{mode:'2',name:'EPON',family:'epon',hint:'1G 双向业务 / 1.25G 线速（原生 MAC）'},{mode:'5',name:'EPON',family:'epon',hint:'1G 双向业务 / 1.25G 线速（10G MAC）'},{mode:'3',name:'XEPON-ASYM',family:'epon',hint:_('10G down / 1G up, asymmetric')},{mode:'4',name:'XEPON-SYM',family:'epon',hint:_('10G down / 10G up, symmetric')},{mode:'6',name:'XG-PON',family:'gpon',hint:_('10G down / 2.5G up (ITU-T G.987)')},{mode:'7',name:'XGS-PON',family:'gpon',hint:_('10G down / 10G up (ITU-T G.9807)')},];var MODULES=[{key:'xpon_int',descr:_('PON core / interrupt driver')},{key:'skbmgr',descr:_('Packet buffer manager')},{key:'qdma_wan',descr:_('WAN QDMA data path')},{key:'en7572',descr:_('SoC PON MAC driver')},{key:'xpon_10g',descr:_('10G PON MAC')},{key:'xpon_gpon',descr:'GPON MAC (G.984)'},{key:'phy_10g',descr:_('10G PON PHY')}];L.env.rpctimeout=120;var callStatus=rpc.declare({object:'luci.xg140g-pon',method:'status',expect:{'':{}}});var callConfigCommit=rpc.declare({object:'luci.xg140g-pon',method:'config_commit',params:['token','values'],expect:{'':{success:false}}});var callReload=rpc.declare({object:'luci.xg140g-pon',method:'reload',params:['token','expected'],expect:{'':{success:false}}});var callUploadBosa=rpc.declare({object:'luci.xg140g-pon',method:'upload_bosa',params:['token','blob'],expect:{'':{success:false}}});var callUploadRi=rpc.declare({object:'luci.xg140g-pon',method:'upload_ri',params:['token','blob'],expect:{'':{success:false}}});var callBeginUpload=rpc.declare({object:'luci.xg140g-pon',method:'begin_upload',params:['kind'],expect:{'':{success:false}}});var callAbortUpload=rpc.declare({object:'luci.xg140g-pon',method:'abort_upload',params:['token'],expect:{'':{success:false}}});var callApplyCalibration=rpc.declare({object:'luci.xg140g-pon',method:'apply_calibration',params:['token'],expect:{'':{success:false}}});var callClearAcMac=rpc.declare({object:'luci.xg140g-pon',method:'clear_ac_mac',expect:{'':{success:false}}});function protoByMode(mode){var m=(mode===null||mode===undefined)?'':String(mode);for(var i=0;i<PROTOCOLS.length;i++)
if(PROTOCOLS[i].mode===m)
return PROTOCOLS[i];return null;}
function protoName(mode){var p=protoByMode(mode);return p?p.name:_('Unknown');}
function protocolFamilyLabel(mode){var m=String(mode||''),p=protoByMode(m);if(!p)
return _('Unknown');if(m==='6')
return _('XG-PON profile');if(m==='7')
return _('XGS-PON profile');if(m==='1')
return _('GPON profile');if(m==='3'||m==='4'||m==='5')
return _('XEPON profile');return _('EPON profile');}
function randomBytes(n){var buf=new Uint8Array(n);if(window.crypto&&typeof window.crypto.getRandomValues==='function'){window.crypto.getRandomValues(buf);}
else{for(var i=0;i<n;i++)
buf[i]=Math.floor(Math.random()*256);}
return buf;}
function toHex(v){return('0'+(v&0xff).toString(16)).slice(-2);}
function randomToken(){var b=randomBytes(16),s='';for(var i=0;i<b.length;i++)
s+=toHex(b[i]);return s;}
function randomMac(){var b=randomBytes(6),out=[];b[0]=(b[0]&0xfe)|0x02;for(var i=0;i<6;i++)
out.push(toHex(b[i]).toUpperCase());return out.join(':');}
function nowStamp(){var d=new Date();return('0'+d.getHours()).slice(-2)+':'+
('0'+d.getMinutes()).slice(-2)+':'+
('0'+d.getSeconds()).slice(-2);}
function errText(err){if(!err)
return _('Unknown error');if(typeof err==='string')
return err;return err.message?String(err.message):String(err);}
function calibrationErrorText(code){switch(code){case'calibration_recovery_busy':return'上次校准事务仍在执行或恢复记录无法确认。请提供系统日志，不要删除恢复记录。';case'calibration_recovery_required':return'上次校准回滚未完成，恢复记录已保留。请提供校准与光模块驱动日志。';case'calibration_storage_failed':return'校准文件暂存失败，请检查 overlay 剩余空间及是否只读。';case'calibration_tmp_failed':return'无法创建上传临时目录，请检查 /tmp 空间。';case'bosa_driver_unavailable':return'EN7572 校准接口未就绪，请检查光模块驱动启动日志。';case'bosa_neutral_state_invalid':return'PON 中立状态未确认，校准未执行。请提供 PON 启动日志。';case'bosa_reload_failed':return'BOSA 运行时加载或硬件校准校验失败，请检查 lddla 日志。';case'bosa_link_stop_failed':return'PON 停链失败，尚未重载 BOSA。';case'bosa_link_start_failed':return'BOSA 重载后的 PON 恢复失败，请检查启动日志。';case'calibration_mode_invalid':return'当前 PON 模式无效，无法应用校准。';case'calibration_apply_failed':return'校准事务应用失败，请检查系统日志中的具体步骤。';case'pending_unavailable':return'导入内容不存在或已被应用，请重新上传后再应用。';case'bosa_empty':return'BOSA 备份全为 00 或 FF，没有校准数据。请导入本机原系统保存的 bob.conf（512 字节）。';case'bosa_invalid':return'BOSA 格式或校准字段无效。请使用本机 bob.conf（512 字节）或原始 BOSA 分区备份（256 KiB）。';case'ri_empty':return'RI 备份全为 00 或 FF，没有身份数据。请使用迁移前保存的本机 RI 备份。';case'ri_invalid':return'RI 格式或身份字段无效。请使用本机原始 RI 分区备份（256 KiB）或 ritool dump 文本。';}
return null;}
var STATUS_FAILURE_LIMIT=2;function statusSnapshotValid(st){var modules=['xpon_int','skbmgr','qdma_wan','en7572','xpon_10g','xpon_gpon','phy_10g'],pon,registration,daemon;if(!st||typeof st!=='object'||Array.isArray(st)||!st.modules||typeof st.modules!=='object'||Array.isArray(st.modules)||!st.pon||typeof st.pon!=='object'||Array.isArray(st.pon)||!st.registration||typeof st.registration!=='object'||Array.isArray(st.registration)||!st.daemon||typeof st.daemon!=='object'||Array.isArray(st.daemon))
return false;for(var i=0;i<modules.length;i++)
if(typeof st.modules[modules[i]]!=='boolean')
return false;pon=st.pon;registration=st.registration;daemon=st.daemon;if(typeof pon.present!=='boolean'||typeof pon.operstate!=='string'||typeof pon.carrier!=='string'||typeof registration.available!=='boolean'||typeof registration.known!=='boolean'||(registration.state!==null&&typeof registration.state!=='number')||(registration.backoff_seconds!==null&&typeof registration.backoff_seconds!=='number')||(registration.authenticated!==null&&typeof registration.authenticated!=='boolean')||(registration.registered!==null&&typeof registration.registered!=='boolean')||typeof daemon.name!=='string'||typeof daemon.running!=='boolean'||typeof daemon.adaptive_running!=='boolean')
return false;return true;}
function setText(node,text){if(!node)
return;dom.content(node,[(text===null||text===undefined)?'':String(text)]);}
function setState(el,state){if(!el)
return;el.classList.remove('xg140g-pon-s-ok','xg140g-pon-s-warn','xg140g-pon-s-err','xg140g-pon-s-idle');el.classList.add('xg140g-pon-s-'+state);}
function show(el,visible){if(!el)
return;if(visible)
el.removeAttribute('hidden');else
el.setAttribute('hidden','');}
var CSS=`
.xg140g-pon-root { display:block; font-size:14px; line-height:1.45;
 --xgp-ok:#1f9d55; --xgp-warn:#c07d16; --xgp-err:#cc3b3b; --xgp-idle:#868d97;
 --xgp-line:rgba(127,133,145,.34); --xgp-line-soft:rgba(127,133,145,.18);
 --xgp-fill:rgba(127,133,145,.07); --xgp-fill-2:rgba(127,133,145,.13); }
@media (prefers-color-scheme: dark) {
 .xg140g-pon-root { --xgp-ok:#3fc47c; --xgp-warn:#e0a544; --xgp-err:#f0706a; --xgp-idle:#99a0aa; }
}
.xg140g-pon-root { max-width:1180px; margin:0 auto; }
.xg140g-pon-root * { box-sizing:border-box; }
.xg140g-pon-root [hidden] { display:none !important; }

.xg140g-pon-head { display:flex; flex-wrap:wrap; align-items:center;
 padding:18px 20px; border:1px solid var(--xgp-line-soft); border-radius:14px;
 background:linear-gradient(125deg,rgba(31,157,85,.14),var(--xgp-fill) 45%,transparent 90%);
 box-shadow:0 6px 20px rgba(0,0,0,.08);
 justify-content:space-between; gap:14px; margin:0 0 14px; }
.xg140g-pon-h2 { margin:0 0 5px; font-size:22px; font-weight:700; letter-spacing:-.02em; }
.xg140g-pon-stamp { font-size:12px; opacity:.65; white-space:nowrap; }

.xg140g-pon-panel { border:1px solid var(--xgp-line); border-radius:12px;
 box-shadow:0 3px 12px rgba(0,0,0,.055);
 background:var(--xgp-fill); padding:16px 18px 18px; margin:0 0 14px; }
.xg140g-pon-phead { display:flex; flex-wrap:wrap; align-items:center; gap:10px;
 justify-content:space-between; padding-bottom:10px; margin-bottom:12px;
 border-bottom:1px solid var(--xgp-line-soft); }
.xg140g-pon-ptitle { margin:0; font-size:15px; font-weight:600;
 display:flex; align-items:center; gap:8px; }
.xg140g-pon-ptitle::before { content:""; display:inline-block; width:3px; height:15px;
 border-radius:2px; background:var(--xgp-c,var(--xgp-idle)); }
.xg140g-pon-psub { font-size:12px; opacity:.65; }

.xg140g-pon-s-ok   { --xgp-c:var(--xgp-ok); }
.xg140g-pon-s-warn { --xgp-c:var(--xgp-warn); }
.xg140g-pon-s-err  { --xgp-c:var(--xgp-err); }
.xg140g-pon-s-idle { --xgp-c:var(--xgp-idle); }

.xg140g-pon-dot { display:inline-block; width:9px; height:9px; border-radius:50%;
 flex:0 0 auto; background:var(--xgp-c,var(--xgp-idle)); }
.xg140g-pon-badge { display:inline-flex; align-items:center; gap:6px; padding:2px 9px;
 border:1px solid var(--xgp-c,var(--xgp-idle)); border-radius:4px;
 color:var(--xgp-c,var(--xgp-idle)); font-size:12px; font-weight:600;
 letter-spacing:.02em; white-space:nowrap; }

.xg140g-pon-metrics { display:grid; gap:10px;
 grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); }
.xg140g-pon-metric { border:1px solid var(--xgp-line-soft); border-radius:9px;
 background:var(--xgp-fill-2); padding:11px 13px; min-width:0; }
.xg140g-pon-metric-k { font-size:11px; text-transform:uppercase; letter-spacing:.06em;
 opacity:.6; margin-bottom:5px; }
.xg140g-pon-metric-v { display:flex; align-items:center; gap:7px; font-size:15px;
 font-weight:600; min-width:0; }
.xg140g-pon-metric-t { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.xg140g-pon-metric-s { font-size:12px; opacity:.62; margin-top:3px;
 overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

.xg140g-pon-mods { display:grid; gap:10px;
 grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); }
.xg140g-pon-mod { display:flex; align-items:center; gap:9px; padding:9px 11px;
 border:1px solid var(--xgp-line-soft); border-left:3px solid var(--xgp-c,var(--xgp-idle));
 border-radius:5px; background:var(--xgp-fill-2); min-width:0; }
.xg140g-pon-mod-name { font-family:monospace; font-size:13px; font-weight:600; }
.xg140g-pon-mod-state { font-size:11.5px; color:var(--xgp-c,var(--xgp-idle)); }
.xg140g-pon-mod-descr { font-size:11px; opacity:.55; overflow:hidden;
 text-overflow:ellipsis; white-space:nowrap; }

.xg140g-pon-columns { display:grid; gap:14px; grid-template-columns:minmax(0,2fr) minmax(280px,1fr); align-items:start; }
.xg140g-pon-grid-2 { display:grid; gap:12px 16px; grid-template-columns:repeat(2,minmax(0,1fr)); }
.xg140g-pon-span-2 { grid-column:1 / -1; }

.xg140g-pon-group { border:1px solid var(--xgp-line-soft); border-radius:9px;
 padding:13px 14px 14px; margin-top:12px; background:var(--xgp-fill-2); }
.xg140g-pon-ghead { display:flex; flex-wrap:wrap; align-items:center; gap:8px;
 justify-content:space-between; margin-bottom:10px; }
.xg140g-pon-gtitle { font-size:13px; font-weight:600; letter-spacing:.02em; }
.xg140g-pon-inactive { opacity:.55; }

.xg140g-pon-upload-grid { display:grid; }
.xg140g-pon-upload-row { display:grid; gap:6px 10px; align-items:center;
 grid-template-columns:minmax(96px,150px) minmax(0,1fr) auto auto;
 padding:9px 0; border-bottom:1px solid var(--xgp-line-soft); }
.xg140g-pon-upload-row:last-child { border-bottom:0; }
.xg140g-pon-upload-name { font-size:12.5px; font-weight:600; white-space:nowrap; }
.xg140g-pon-upload-hint { grid-column:1 / -1; font-size:11px; opacity:.6; margin-top:-2px; }
.xg140g-pon-upload-row input[type=file] { height:32px; padding:4px 8px; min-width:0; width:100%;
 border:1px solid var(--xgp-line); border-radius:5px; background:transparent;
 color:inherit; font-size:12px; }
.xg140g-pon-upcheck { min-width:18px; text-align:center;
 color:var(--xgp-ok); font-size:16px; font-weight:700; }
.xg140g-pon-upcheck-warn { color:var(--xgp-warn); }
.xg140g-pon-upload-msg { font-size:12px; opacity:.8; margin-top:8px; }
.xg140g-pon-upload-msg-err { color:var(--xgp-err); opacity:1; font-weight:600; }

.xg140g-pon-field { display:flex; flex-direction:column; gap:5px; min-width:0; }
.xg140g-pon-label { font-size:12.5px; font-weight:600; opacity:.85; }
.xg140g-pon-req { color:var(--xgp-err); }
.xg140g-pon-control { display:flex; align-items:center; gap:6px; }
.xg140g-pon-input { flex:1 1 auto; width:100%; min-width:0; height:32px; padding:0 9px;
 border:1px solid var(--xgp-line); border-radius:5px; background:transparent;
 color:inherit; font-size:13.5px; font-family:inherit; }
.xg140g-pon-mono { font-family:monospace; letter-spacing:.03em; }
.xg140g-pon-input:focus { outline:none; border-color:var(--xgp-ok);
 box-shadow:0 0 0 2px rgba(127,133,145,.22); }
.xg140g-pon-input:disabled { opacity:.55; }
.xg140g-pon-input.xg140g-pon-bad { border-color:var(--xgp-err); }
.xg140g-pon-hint { font-size:11.5px; opacity:.6; }
.xg140g-pon-error { font-size:11.5px; color:var(--xgp-err); font-weight:600; }
.xg140g-pon-btn-inline { flex:0 0 auto; height:32px; padding:0 12px !important;
 white-space:nowrap; font-size:12.5px !important; }

.xg140g-pon-note { border:1px solid var(--xgp-line-soft);
 border-left:3px solid var(--xgp-c,var(--xgp-idle)); border-radius:5px;
 padding:10px 12px; margin-bottom:10px; background:var(--xgp-fill-2); }
.xg140g-pon-note-t { font-size:12.5px; font-weight:600; margin-bottom:4px;
 display:flex; align-items:center; gap:7px; }
.xg140g-pon-note-b { font-size:12px; opacity:.75; }
.xg140g-pon-note ul { margin:6px 0 0; padding-left:18px; }
.xg140g-pon-note li { margin:2px 0; }
.xg140g-pon-note a { color:inherit; }

.xg140g-pon-tool-actions { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin:0 0 10px; }
.xg140g-pon-report { width:100%; min-height:260px; resize:vertical; padding:10px; border:1px solid var(--xgp-line); border-radius:6px; background:transparent; color:inherit; font:12px/1.45 monospace; white-space:pre; }
.xg140g-pon-log { list-style:none; margin:0; padding:0; max-height:220px; overflow:auto; }
.xg140g-pon-log-item { display:flex; gap:8px; padding:5px 0; font-size:12px;
 border-bottom:1px solid var(--xgp-line-soft); }
.xg140g-pon-log-item:last-child { border-bottom:0; }
.xg140g-pon-log-time { font-family:monospace; opacity:.55; flex:0 0 auto; }
.xg140g-pon-log-text { color:var(--xgp-c,inherit); word-break:break-word; }
.xg140g-pon-log-empty { font-size:12px; opacity:.55; padding:4px 0; }

.xg140g-pon-actions { display:flex; flex-wrap:wrap; align-items:center; gap:10px;
 justify-content:flex-end; border-top:1px solid var(--xgp-line-soft);
 padding-top:12px; margin-top:4px; }
.xg140g-pon-actions-msg { margin-right:auto; display:flex; align-items:center; gap:8px;
 font-size:12.5px; opacity:.8; }
.xg140g-pon-spin { display:inline-block; width:13px; height:13px; border-radius:50%;
 border:2px solid var(--xgp-line); border-top-color:var(--xgp-ok);
 animation:xg140g-pon-rot .8s linear infinite; }
@keyframes xg140g-pon-rot { to { transform:rotate(360deg); } }

@media (max-width:1000px) { .xg140g-pon-columns { grid-template-columns:minmax(0,1fr); } }
@media (max-width:640px) {
 .xg140g-pon-grid-2 { grid-template-columns:minmax(0,1fr); }
 .xg140g-pon-upload-row { grid-template-columns:minmax(0,1fr) auto auto; }
 .xg140g-pon-upload-name { grid-column:1 / -1; }
 .xg140g-pon-panel { padding:12px; }
 .xg140g-pon-actions { justify-content:stretch; }
 .xg140g-pon-actions .cbi-button { flex:1 1 auto; }
 .xg140g-pon-actions-msg { width:100%; margin-bottom:4px; }
}
`;return view.extend({load:function(){return Promise.all([uci.load(CFG),callStatus().catch(function(err){return{__error:errText(err)};})]);},readConfig:function(){function g(opt){var v=uci.get(CFG,SID,opt);return(v===null||v===undefined)?'':String(v);}
var password=g('password');return{mode:g('mode'),ethaddr:g('ethaddr'),loid:g('loid'),password:password,gpon_sn:g('gpon_sn'),gpon_regid:g('gpon_regid'),ploam_password:g('ploam_password')};},collectValues:function(){var f=this.fields;return{mode:String(f.mode.input.value||''),ethaddr:f.ethaddr.input.value||'',loid:f.loid.input.value||'',password:f.password.input.value||'',gpon_sn:f.gpon_sn.input.value||'',gpon_regid:f.gpon_regid.input.value||'',ploam_password:f.ploam_password.input.value||''};},setFormValues:function(v){var f=this.fields;f.mode.input.value=v.mode;f.ethaddr.input.value=v.ethaddr;f.loid.input.value=v.loid;f.password.input.value=v.password;f.gpon_sn.input.value=v.gpon_sn;f.gpon_regid.input.value=v.gpon_regid;f.ploam_password.input.value=v.ploam_password||'';for(var k in f)
this.setFieldError(f[k],null);this.applyMode();this.updateDirty();},isDirty:function(){var cur=this.collectValues(),base=this.baseline;for(var i=0;i<IDENTITY_KEYS.length;i++){var k=IDENTITY_KEYS[i];if(String(cur[k])!==String(base[k]))
return true;}
return false;},makeField:function(o){var self=this,id='xg140g-pon-f-'+o.name,input=E('input',{'id':id,'type':(o.type==='password')?'password':'text','class':'cbi-input-text xg140g-pon-input'+(o.mono?' xg140g-pon-mono':''),'placeholder':o.placeholder||'','maxlength':o.maxlength||null,'spellcheck':'false','autocomplete':'off','autocapitalize':'off','autocorrect':'off'});if(o.choices)input=E('select',{id:id,class:'cbi-input-select'},o.choices.map(function(c){return E('option',{value:c[0]},c[1]);}));var controls=[input];if(o.type==='password'){var eye=E('button',{'type':'button','class':'cbi-button cbi-button-neutral xg140g-pon-btn-inline','title':_('Show or hide the entered value'),'aria-label':_('Show or hide the entered value'),'click':function(ev){ev.preventDefault();var hidden=(input.type==='password');input.type=hidden?'text':'password';setText(ev.currentTarget,hidden?_('Hide'):_('Show'));}},[_('Show')]);controls.push(eye);}
if(o.button)
controls.push(o.button);var err=E('div',{'class':'xg140g-pon-error','hidden':''},['']);var children=[E('label',{'class':'xg140g-pon-label','for':id},o.required?[o.label,E('span',{'class':'xg140g-pon-req'},[' *'])]:[o.label]),E('div',{'class':'xg140g-pon-control'},controls)];if(o.hint)
children.push(E('div',{'class':'xg140g-pon-hint'},[o.hint]));children.push(err);var row=E('div',{'class':'xg140g-pon-field'+(o.wide?' xg140g-pon-span-2':''),'data-field':o.name},children);var field={name:o.name,row:row,input:input,error:err,validate:o.validate||null,button:o.button||null};input.addEventListener('input',function(){self.setFieldError(field,null);self.updateDirty();});input.addEventListener('change',function(){self.updateDirty();});return field;},setFieldError:function(field,msg){if(!field)
return;if(msg){setText(field.error,msg);show(field.error,true);field.input.classList.add('xg140g-pon-bad');}
else{setText(field.error,'');show(field.error,false);field.input.classList.remove('xg140g-pon-bad');}},validateField:function(field){if(!field||!field.validate)
return null;var values=this.collectValues(),msg=field.validate(values[field.name]);this.setFieldError(field,msg);return msg;},validateAll:function(values){var errors=[],order=['ethaddr','loid','password','gpon_sn','gpon_regid','ploam_password'];for(var i=0;i<order.length;i++){var field=this.fields[order[i]];if(!field||!field.validate)
continue;var msg=field.validate(values[field.name]);this.setFieldError(field,msg);if(msg)
errors.push({field:field,msg:msg});}
return errors;},renderHeader:function(){this.ui.stamp=E('div',{'class':'xg140g-pon-stamp'},[_('Waiting for status…')]);return E('div',{'class':'xg140g-pon-head'},[E('div',{},[E('h2',{'class':'xg140g-pon-h2'},[_('PON Management')])]),this.ui.stamp]);},renderMetric:function(key,label){var text=E('span',{'class':'xg140g-pon-metric-t'},['–']),dot=E('span',{'class':'xg140g-pon-dot'}),sub=E('div',{'class':'xg140g-pon-metric-s'},['']),tile=E('div',{'class':'xg140g-pon-metric xg140g-pon-s-idle'},[E('div',{'class':'xg140g-pon-metric-k'},[label]),E('div',{'class':'xg140g-pon-metric-v'},[dot,text]),sub]);this.ui.metrics[key]={tile:tile,text:text,sub:sub};return tile;},renderOverview:function(){this.ui.metrics={};this.ui.overallBadge=E('span',{'class':'xg140g-pon-badge xg140g-pon-s-idle'},[E('span',{'class':'xg140g-pon-dot'}),E('span',{},[_('Unknown')])]);this.ui.statusErr=E('div',{'class':'xg140g-pon-note xg140g-pon-s-err','hidden':''},[E('div',{'class':'xg140g-pon-note-t'},[_('Status query failed')]),this.ui.statusErrText=E('div',{'class':'xg140g-pon-note-b'},[''])]);return E('div',{'class':'xg140g-pon-panel xg140g-pon-s-ok'},[E('div',{'class':'xg140g-pon-phead'},[E('h3',{'class':'xg140g-pon-ptitle'},[_('Link overview')]),this.ui.overallBadge]),this.ui.statusErr,E('div',{'class':'xg140g-pon-metrics'},[this.renderMetric('protocol',_('Detected protocol')),this.renderMetric('mode',_('Operation mode')),this.renderMetric('link',_('PON interface')),this.renderMetric('reg',_('Registration')),this.renderMetric('daemon',_('PON daemon'))])]);},renderModules:function(){var self=this;this.ui.mods={};this.ui.modSummary=E('span',{'class':'xg140g-pon-psub'},['–']);var cards=MODULES.map(function(m){var state=E('div',{'class':'xg140g-pon-mod-state'},[_('Unknown')]),card=E('div',{'class':'xg140g-pon-mod xg140g-pon-s-idle'},[E('span',{'class':'xg140g-pon-dot'}),E('div',{'style':'min-width:0'},[E('div',{'class':'xg140g-pon-mod-name'},[m.key]),state,E('div',{'class':'xg140g-pon-mod-descr','title':m.descr},[m.descr])])]);self.ui.mods[m.key]={card:card,state:state};return card;});return E('div',{'class':'xg140g-pon-panel xg140g-pon-s-idle'},[E('div',{'class':'xg140g-pon-phead'},[E('h3',{'class':'xg140g-pon-ptitle'},[_('PON driver modules')]),this.ui.modSummary]),E('div',{'class':'xg140g-pon-mods'},cards)]);},renderIdentity:function(){var self=this;this.fields={};this.fields.mode={name:'mode',input:E('input',{'type':'hidden'}),error:E('div'),row:E('span')};var randomBtn=E('button',{'type':'button','class':'cbi-button cbi-button-neutral xg140g-pon-btn-inline','title':_('Generate a locally administered unicast address'),'click':function(ev){ev.preventDefault();self.fields.ethaddr.input.value=randomMac();self.setFieldError(self.fields.ethaddr,null);self.validateField(self.fields.ethaddr);self.updateDirty();self.log('info',_('Generated a random locally administered PON MAC address.'));}},[_('Generate')]);this.fields.ethaddr=this.makeField({name:'ethaddr',label:_('MAC address'),mono:true,button:randomBtn});this.fields.loid=this.makeField({name:'loid',label:_('LOID'),mono:true});this.fields.password=this.makeField({name:'password',type:'password',label:_('LOID password'),mono:true});this.fields.ploam_password=this.makeField({name:'ploam_password',type:'password',label:'GPON PLOAM 密码',hint:'GPON 使用，最多 10 字节；与 LOID 密码独立。'});this.fields.gpon_sn=this.makeField({name:'gpon_sn',label:_('Serial number'),mono:true});this.fields.gpon_regid=this.makeField({name:'gpon_regid',label:_('Registration ID'),mono:true,wide:true});this.ui.identityGroup=E('div',{'class':'xg140g-pon-group'},[E('div',{'class':'xg140g-pon-ghead'},[E('span',{'class':'xg140g-pon-gtitle'},[_('PON identity')])]),E('div',{'class':'xg140g-pon-grid-2'},[this.fields.ethaddr.row,this.fields.loid.row,this.fields.password.row,this.fields.gpon_sn.row,this.fields.gpon_regid.row,this.fields.ploam_password.row])]);this.ui.currentProto=E('span',{'class':'xg140g-pon-badge xg140g-pon-s-idle'},[E('span',{},['–'])]);var protocolDisplay=E('div',{'class':'xg140g-pon-field xg140g-pon-span-2'},[E('div',{'class':'xg140g-pon-label'},[_('Current protocol')]),E('div',{'class':'xg140g-pon-control'},[this.ui.currentProto])]);return E('div',{'class':'xg140g-pon-panel xg140g-pon-s-ok'},[E('div',{'class':'xg140g-pon-phead'},[E('h3',{'class':'xg140g-pon-ptitle'},[_('PON identity configuration')])]),protocolDisplay,this.ui.identityGroup,this.renderCalibration(),this.renderActions()]);},renderCalibration:function(){var self=this;this.ui.bosaFile=E('input',{type:'file',accept:'.bin,.conf,application/octet-stream'});this.ui.riFile=E('input',{type:'file',accept:'.txt,.ri,.bin,text/plain,application/octet-stream'});this.ui.bosaCheck=E('span',{'class':'xg140g-pon-upcheck','hidden':'','title':'已应用并自动保存'},['✓']);this.ui.riCheck=E('span',{'class':'xg140g-pon-upcheck','hidden':'','title':'已应用并自动保存'},['✓']);this.ui.calMsg=E('div',{'class':'xg140g-pon-upload-msg','hidden':''},['']);var mkRow=function(name,hint,input,button,check){return E('div',{'class':'xg140g-pon-upload-row'},[E('div',{'class':'xg140g-pon-upload-name'},[name]),input,button,check,E('div',{'class':'xg140g-pon-upload-hint'},[hint])]);};this.ui.bosaBtn=E('button',{'type':'button','class':'cbi-button cbi-button-neutral xg140g-pon-btn-inline','click':function(){self.uploadCalibration(self.ui.bosaFile,self.ui.bosaCheck,'bosa');}},['上传']);this.ui.riBtn=E('button',{'type':'button','class':'cbi-button cbi-button-neutral xg140g-pon-btn-inline','click':function(){self.uploadCalibration(self.ui.riFile,self.ui.riCheck,'ri');}},['上传']);this.ui.bosaFile.addEventListener('change',function(){show(self.ui.bosaCheck,false);show(self.ui.calMsg,false);});this.ui.riFile.addEventListener('change',function(){show(self.ui.riCheck,false);show(self.ui.calMsg,false);});return E('div',{'class':'xg140g-pon-group'},[E('div',{'class':'xg140g-pon-ghead'},[E('span',{'class':'xg140g-pon-gtitle'},['BOSA / RI 导入'])]),E('div',{'class':'xg140g-pon-upload-grid'},[mkRow('BOSA 校准','bob.conf（512 字节）· mtd*_bosa.bin（256 KiB）',this.ui.bosaFile,this.ui.bosaBtn,this.ui.bosaCheck),mkRow('RI 导出','mtd*_ri.bin（256 KiB）· ritool dump 文本',this.ui.riFile,this.ui.riBtn,this.ui.riCheck)]),this.ui.calMsg]);},setUploadBusy:function(busy){var lock=busy||this.identityStale===true;if(this.ui.bosaBtn)this.ui.bosaBtn.disabled=busy;if(this.ui.riBtn)this.ui.riBtn.disabled=busy;if(this.ui.bosaFile)this.ui.bosaFile.disabled=busy;if(this.ui.riFile)this.ui.riFile.disabled=busy;for(var k in this.fields)
if(k!=='mode'&&this.fields[k]&&this.fields[k].input){this.fields[k].input.disabled=lock;if(this.fields[k].button)
this.fields[k].button.disabled=lock;}
if(this.btnReset)this.btnReset.disabled=lock||!this.isDirty();if(this.btnSave)this.btnSave.disabled=lock;if(this.btnApply)this.btnApply.disabled=lock;},reloadIdentitySnapshot:function(){var self=this;uci.unload(CFG);return uci.load(CFG).then(function(){self.identityStale=false;self.baseline=self.readConfig();self.setFormValues(self.baseline);return self.refreshStatus().catch(function(){});});},uploadCalibration:function(input,check,kind){var self=this,file=input&&input.files&&input.files[0],lease=null,staged=false,applied=false;if(this.busy)
return;if(!kind){setText(this.ui.calMsg,'上传通道不可用。');show(this.ui.calMsg,true);return;}
if(!file){setText(this.ui.calMsg,'请先选择文件。');show(this.ui.calMsg,true);return;}
if(file.size===0){setText(this.ui.calMsg,'文件为空。');show(this.ui.calMsg,true);return;}
if(kind==='bosa'&&file.size!==512&&file.size!==262144){setText(this.ui.calMsg,'BOSA 仅支持 bob.conf（512 字节）或 mtd*_bosa.bin（256 KiB）。');show(this.ui.calMsg,true);return;}
if(file.size>262144){setText(this.ui.calMsg,'文件超过 256 KiB 上限。');show(this.ui.calMsg,true);return;}
if(this.isDirty()){this.ui.calMsg.classList.add('xg140g-pon-upload-msg-err');setText(this.ui.calMsg,'身份字段有未保存修改，请先保存或还原后再上传。');show(this.ui.calMsg,true);this.log('warn','请先保存或撤销身份修改，再导入文件。');return;}
show(check,false);check.classList.remove('xg140g-pon-upcheck-warn');this.busy=true;this.setUploadBusy(true);this.ui.calMsg.classList.remove('xg140g-pon-upload-msg-err');setText(this.ui.calMsg,'正在上传…');show(this.ui.calMsg,true);callBeginUpload(kind).then(function(begin){if(!begin||begin.success!==true||!begin.token||!begin.path)
throw new Error((begin&&begin.error)||'upload session unavailable');lease=begin;var data=new FormData();data.append('sessionid',rpc.getSessionID());data.append('filename',begin.path);data.append('filedata',file);return request.post(L.env.cgi_base+'/cgi-upload',data,{timeout:60000}).then(function(res){var reply;try{reply=res&&res.json?res.json():null;}catch(e){throw new Error('cgi-upload returned invalid JSON');}
if(!reply||reply.failure)
throw new Error((reply&&reply.message)||'cgi-upload failed');return kind==='bosa'?callUploadBosa(begin.token,'@file:'+begin.path):callUploadRi(begin.token,'@file:'+begin.path);});}).then(function(staged_res){if(!staged_res||staged_res.success!==true)
throw new Error(calibrationErrorText(staged_res&&staged_res.error)||(staged_res&&staged_res.error)||'validation failed');staged=true;setText(self.ui.calMsg,'已暂存，正在应用…');return callApplyCalibration(lease.token);}).then(function(applied_res){if(!applied_res||applied_res.success!==true)
throw new Error(calibrationErrorText(applied_res&&applied_res.error)||(applied_res&&applied_res.error)||'apply failed');applied=true;input.value='';var warn=applied_res.warning==='adaptive_restart_failed'?'已应用；自适应服务重启失败。':(applied_res.warning==='identity_stop_failed'?'已应用；身份管理进程停止失败，请检查进程。':null);if(warn)
check.classList.add('xg140g-pon-upcheck-warn');show(check,true);self.ui.calMsg.classList.remove('xg140g-pon-upload-msg-err');setText(self.ui.calMsg,warn||'已应用并自动保存，PON 正在重新注册。');show(self.ui.calMsg,true);self.log(warn?'warn':'ok',warn||(kind==='bosa'?'BOSA 校准已应用。':'RI 导入已应用，身份字段已同步。'));setTimeout(function(){if(!self.busy)
show(self.ui.calMsg,false);},8000);return self.reloadIdentitySnapshot().catch(function(rerr){return self.reloadIdentitySnapshot().then(function(){self.log('warn','表单刷新曾失败一次，已自动恢复。');}).catch(function(){self.identityStale=true;setText(self.ui.calMsg,'已应用并保存，但表单刷新失败：'+errText(rerr)+'；请刷新页面后再编辑身份。');self.ui.calMsg.classList.add('xg140g-pon-upload-msg-err');show(self.ui.calMsg,true);self.log('warn','已应用并保存，但表单刷新失败：'+errText(rerr));});});}).catch(function(err){if(lease&&lease.token&&!applied)
callAbortUpload(lease.token).catch(function(){});var prefix=applied?'已应用，但后续处理失败：':(staged?'应用失败（导入内容已保留，请重新上传后再试）：':'上传失败：');setText(self.ui.calMsg,prefix+errText(err));self.ui.calMsg.classList.add('xg140g-pon-upload-msg-err');show(self.ui.calMsg,true);self.log('err',prefix+errText(err));}).finally(function(){self.busy=false;self.setUploadBusy(false);self.updateDirty();});},handleClearAcMac:function(){var self=this;self.log('info',_('Clearing PPPoE AC MAC…'));return callClearAcMac().then(function(res){if(res&&res.success){var cleared=(res.cleared&&res.cleared.length)?res.cleared.join(', '):'';if(cleared)
self.log('ok',_('Cleared ac_mac on %s and reconnected.').format(cleared));else
self.log('info',_('No ac_mac pin found on wan/wan6; nothing to clear.'));}else{self.log('err',_('Failed to clear the PPPoE AC MAC.'));}}).catch(function(){self.log('err',_('Failed to clear the PPPoE AC MAC.'));});},renderActions:function(){this.ui.actionIcon=E('span',{'class':'xg140g-pon-spin','hidden':''});this.ui.actionText=E('span',{},[_('No unsaved changes.')]);this.btnClearAcMac=E('button',{'class':'cbi-button cbi-button-neutral','type':'button','click':ui.createHandlerFn(this,'handleClearAcMac')},[_('Clear PPPoE AC MAC')]);this.btnReset=E('button',{'class':'cbi-button cbi-button-neutral','type':'button','click':ui.createHandlerFn(this,'handleReset')},[_('Revert')]);this.btnSave=E('button',{'class':'cbi-button cbi-button-save','type':'button','click':ui.createHandlerFn(this,'handleSave')},[_('Save configuration')]);this.btnApply=E('button',{'class':'cbi-button cbi-button-apply important','type':'button','click':ui.createHandlerFn(this,'handleSaveApply')},[_('Save & apply')]);return E('div',{'class':'xg140g-pon-actions'},[E('div',{'class':'xg140g-pon-actions-msg'},[this.ui.actionIcon,this.ui.actionText]),this.btnClearAcMac,this.btnReset,this.btnSave,this.btnApply]);},renderLog:function(){this.ui.logEmpty=E('li',{'class':'xg140g-pon-log-empty'},[_('No activity recorded yet.')]);this.ui.log=E('ul',{'class':'xg140g-pon-log'},[this.ui.logEmpty]);return E('div',{'class':'xg140g-pon-panel xg140g-pon-s-idle'},[E('div',{'class':'xg140g-pon-phead'},[E('h3',{'class':'xg140g-pon-ptitle'},[_('Activity')])]),this.ui.log]);},log:function(kind,text){if(!this.ui||!this.ui.log)
return;if(this.ui.logEmpty&&this.ui.logEmpty.parentNode)
this.ui.log.removeChild(this.ui.logEmpty);var item=E('li',{'class':'xg140g-pon-log-item xg140g-pon-s-'+kind},[E('span',{'class':'xg140g-pon-log-time'},[nowStamp()]),E('span',{'class':'xg140g-pon-log-text'},[text])]);this.ui.log.insertBefore(item,this.ui.log.firstChild);while(this.ui.log.childNodes.length>20)
this.ui.log.removeChild(this.ui.log.lastChild);},applyMode:function(){var mode=String(this.fields.mode.input.value||''),name=protoName(mode);setText(this.ui.currentProto.lastChild,mode?'%s · 模式 %s'.format(_('Configured: %s').format(name),mode):_('Unknown'));setState(this.ui.currentProto,'idle');},updateDirty:function(){if(this.busy)
return;if(this.identityStale===true){setText(this.ui.actionText,'身份已在设备端变更，表单未同步；请刷新页面后再编辑。');this.btnReset.disabled=true;return;}
var dirty=this.isDirty();setText(this.ui.actionText,dirty?_('Unsaved changes are pending.'):_('No unsaved changes.'));this.btnReset.disabled=!dirty;},refreshStatus:function(){var self=this;return callStatus().then(function(st){if(!statusSnapshotValid(st))
throw new Error(_('Invalid PON status payload'));self.statusError=null;self.statusFailures=0;self.statusValid=true;self.status=st;self.statusLastUpdate=nowStamp();self.updateStatus();}).catch(function(err){self.statusFailures=(self.statusFailures||0)+1;self.statusError=errText(err);if(!self.statusValid)
self.status={};self.updateStatus();});},setMetric:function(key,state,text,sub){var m=this.ui.metrics[key];if(!m)
return;setState(m.tile,state);setText(m.text,text);setText(m.sub,sub||'');},updateStatus:function(){var st=this.status||{},validSnapshot=this.statusValid===true&&statusSnapshotValid(st),failed=!!this.statusError&&!validSnapshot,stale=validSnapshot&&!!this.statusError,showError=failed||(stale&&this.statusFailures>=STATUS_FAILURE_LIMIT);show(this.ui.statusErr,showError);if(showError)
setText(this.ui.statusErrText,failed?_('Could not read the PON status via ubus: %s').format(this.statusError):_('Status update temporarily unavailable; showing last valid state: %s').format(this.statusError));if(failed)
setText(this.ui.stamp,_('Status unavailable · retrying every 5 s'));else if(stale)
setText(this.ui.stamp,_('Last valid update: %s · retrying every 5 s').format(this.statusLastUpdate||nowStamp()));else{if(validSnapshot)
this.statusLastUpdate=this.statusLastUpdate||nowStamp();setText(this.ui.stamp,_('Last update: %s · auto refresh 5 s').format(this.statusLastUpdate||nowStamp()));}
var configuredMode=(st.mode===undefined||st.mode===null)?'':String(st.mode),activeMode=st.active_mode===undefined?configuredMode:(st.active_mode===null?'':String(st.active_mode)),switching=st.switching===true||(st.adaptive&&st.adaptive.switching===true),mode=activeMode,configuredName=st.protocol?String(st.protocol):protoName(configuredMode),name=st.active_protocol?String(st.active_protocol):protoName(mode),p=protoByMode(mode),family=p?p.family:null,adaptive=st.adaptive||{},detectedFamily=adaptive.family==='epon'?'epon':(adaptive.family==='itu'?'gpon':null),exactDetected=adaptive.exact===true,familyLabel=detectedFamily==='epon'?(adaptive.rx_class===1?'10G EPON 协议族':_('EPON family')):(detectedFamily==='gpon'?(adaptive.rx_class===2?'XG-PON / XGS-PON 协议族':_('GPON family')):_('Not yet identified')),displayName=switching?_('Switching protocol'):(exactDetected&&p?name:familyLabel),displaySub=switching?_('Running: %s · target: %s').format(name,configuredName):(p?_('Configured: %s').format(configuredName):_('Protocol not recognised'));var nominalRate=detectedFamily==='epon'&&adaptive.rx_class===1&&adaptive.rx_nominal_kbps===10312500?'10.3125 Gb/s':(detectedFamily==='gpon'&&adaptive.rx_class===2&&adaptive.rx_nominal_kbps===9953280?'9.95328 Gb/s':null);if(nominalRate)
displaySub+=' · 下行协议线速：'+nominalRate+'（帧同步确认）';if(!failed&&configuredMode!==''&&this.fields&&this.fields.mode&&this.fields.mode.input.value!==configuredMode){this.fields.mode.input.value=configuredMode;this.baseline.mode=configuredMode;this.applyMode();}
if(!failed&&this.ui.currentProto){setState(this.ui.currentProto,switching?'warn':(detectedFamily?'ok':'warn'));setText(this.ui.currentProto.lastChild,switching?'%s · 模式 %s'.format(displayName,mode):(detectedFamily&&p?'%s · 模式 %s'.format(displayName,mode):displayName));}
this.setMetric('protocol',failed?'idle':(switching?'warn':(detectedFamily?'ok':'warn')),failed?_('Unknown'):displayName,failed?_('Protocol not recognised'):(!exactDetected&&detectedFamily?displaySub+' · '+_('Detection: family only'):displaySub+(exactDetected&&p?' · '+p.hint:' · '+_('Waiting for frame synchronization'))));var boardNames={'xg140g-tf':'XG-140G-TF','xg040g-tf':'XG-040G-TF','xg140g-md':'XG-140G-MD','xg040g-md':'XG-040G-MD'},board=st.board||{},boardName=boardNames[board.model],modeSub=p?_('Family: %s').format(protocolFamilyLabel(mode)):'';if(boardName)
modeSub+=' · '+boardName+(board.source==='configured'?'（已设定）':'（RI 记录）');else if(!failed)
modeSub+=' · 型号未识别';if(adaptive.boot_probe_failed===true)
modeSub+=' · 冷启动识别';this.setMetric('mode',failed?'idle':(switching?'warn':(p?'ok':'warn')),failed?'–':(mode!==''?'模式 %s'.format(mode):_('Unknown')),modeSub);var pon=st.pon||{},reg=st.registration||{},linkState='idle',linkText=_('Unknown'),linkSub='';if(!failed){if(!pon.present){linkState='err';linkText=_('Not present');linkSub=_('No PON netdev exposed by the driver');}
else if(pon.los_clear===0){linkState='warn';linkText='光信号丢失';linkSub='等待光信号';}
else if(pon.los_clear===1&&pon.carrier==='1'){linkState=family==='gpon'&&reg.registered!==true?'warn':'ok';linkText=family==='gpon'&&reg.registered!==true?'光信号已同步，PON 未注册':'光信号已同步';linkSub='LOS 正常 · 载波已连接';}
else{linkState='warn';linkText=pon.los_clear===1?'有光信号，等待同步':'光状态未知';linkSub='接口状态：'+String(pon.operstate||'unknown');}}
this.setMetric('link',linkState,linkText,linkSub);var regState='idle',regText=_('Unknown'),regSub='';if(!failed){var authText=null;if(reg.authenticated===true)
authText=_('LOID auth passed');else if(reg.authenticated===false)
authText=family==='gpon'?'LOID 认证失败':_('LOID auth pending');var chain=[];if(family==='epon'){if(reg.state!==undefined&&reg.state!==null)
chain.push(_('MPCP state %s').format(String(reg.state)));if(reg.state===5&&reg.backoff_seconds!==undefined&&reg.backoff_seconds!==null)
chain.push(_('MPCP denied; retry in %s s').format(String(reg.backoff_seconds)));if(authText)
chain.push(authText);}
else if(family==='gpon'){chain.push(reg.exchange_ready===true?'OMCI 交互已建立':'等待 OMCI 交互');var omci=st.omci||{};if(authText)chain.push(authText);else if(omci.registration_type===2||omci.registration_type===3)
chain.push('等待 LOID 认证结果');if(omci.loid_ignored)chain.push('当前认证方式忽略 LOID 状态 '+omci.loid_status);if(omci.enhanced_security_state===3)chain.push('增强认证通过');else if(omci.enhanced_security_state===4)chain.push('增强认证失败');}
else if(reg.state!==undefined&&reg.state!==null){chain.push(_('state: %s').format(String(reg.state)));}
regSub=chain.join(' · ');var familyEvidenceOnly=!!detectedFamily&&(family==='gpon'||family==='epon')&&st.adaptive&&/selected-family|detected-family|family-detected/.test(st.adaptive.phase||'')&&st.adaptive.exact===false;if(switching){regState='warn';regText=_('Protocol switch in progress');regSub=_('Protocol switching; registration is temporarily unavailable.');}
else if(familyEvidenceOnly){regState='warn';regText=family==='epon'?_('EPON family detected'):_('GPON family detected');regSub=family==='epon'?_('EPON family evidence only'):_('GPON family evidence only');}
else if(family==='gpon'&&(reg.authenticated===false||st.omci?.enhanced_security_state===4)){regState='err';regText='认证失败';}
else if(family==='gpon'&&reg.authenticated!==true&&(st.omci?.registration_type===2||st.omci?.registration_type===3)){regState='warn';regText='等待 LOID 认证结果';}
else if(reg.registered){regState='ok';regText=family==='epon'?_('MPCP registered'):_('PLOAM / OMCI registered');}
else if(reg.available){regState='warn';regText=family==='epon'?_('MPCP registering'):_('PLOAM / OMCI registering');}
else if(family==='gpon'&&!reg.known){regState='idle';regText=_('Registration state unknown');regSub=_('Registration state is not exposed by this interface.');}
else{regState='err';regText=family==='epon'?_('MPCP not available'):_('PLOAM / OMCI not available');}}
this.setMetric('reg',regState,regText,regSub);var dmn=st.daemon||{},dState='idle',dText=_('Unknown'),dSub='';if(!failed){dText=dmn.name?String(dmn.name):_('None');dSub=dmn.running?_('Running'):_('Stopped');dState=dmn.running?'ok':'err';}
this.setMetric('daemon',dState,dText,dSub);var mods=st.modules||{},loaded=0,requiredModules=MODULES.length-1;var activeMac=activeMode==='1'?'xpon_gpon':'xpon_10g';for(var i=0;i<MODULES.length;i++){var key=MODULES[i].key,entry=this.ui.mods[key],ok=!!mods[key];if(!entry)
continue;var inactiveMac=(key==='xpon_10g'||key==='xpon_gpon')&&key!==activeMac;entry.card.style.display=inactiveMac?'none':'';if(inactiveMac){setState(entry.card,'idle');setText(entry.state,_('Not selected'));continue;}
if(failed){setState(entry.card,'idle');setText(entry.state,_('Unknown'));continue;}
if(ok)
loaded++;setState(entry.card,ok?'ok':'err');setText(entry.state,ok?_('Loaded'):_('Missing'));}
setText(this.ui.modSummary,failed?_('Module state unknown'):_('%d of %d modules loaded').format(loaded,requiredModules));var health='idle',healthText=_('Unknown'),healthSub=_('No status data');if(!failed){if(switching){health='warn';healthText=_('Protocol switch in progress');healthSub=_('Protocol switching; registration is temporarily unavailable.');}
else if(loaded<requiredModules||!pon.present||!dmn.running){health='err';healthText=_('Degraded');healthSub=(loaded<requiredModules)?_('%d driver module(s) missing').format(requiredModules-loaded):(!pon.present?_('PON interface missing'):_('PON daemon not running'));}
else if(family==='gpon'&&(reg.authenticated===false||st.omci?.enhanced_security_state===4)){health='err';healthText='认证失败';healthSub='请检查线路认证信息';}
else if(String(pon.operstate||'').toLowerCase()!=='up'||(family==='gpon'&&reg.authenticated!==true&&(st.omci?.registration_type===2||st.omci?.registration_type===3))||(family==='epon'&&(!reg.available||!reg.registered))||(family==='gpon'&&reg.registered!==true)){health='warn';healthText=_('Waiting');healthSub=family==='epon'?_('MPCP registration still pending'):_('PLOAM / OMCI registration still pending');}
else{health='ok';healthText=_('Operational');healthSub=_('All checks passed');}}
setState(this.ui.overallBadge,health);setText(this.ui.overallBadge.lastChild,healthText);},setBusy:function(busy,msg){this.busy=busy;this.btnSave.disabled=busy;this.btnApply.disabled=busy;this.btnReset.disabled=busy;if(this.ui.bosaBtn)this.ui.bosaBtn.disabled=busy;if(this.ui.riBtn)this.ui.riBtn.disabled=busy;if(this.ui.bosaFile)this.ui.bosaFile.disabled=busy;if(this.ui.riFile)this.ui.riFile.disabled=busy;show(this.ui.actionIcon,busy);if(busy)
setText(this.ui.actionText,msg||_('Working…'));else
this.updateDirty();},doSave:function(apply){var self=this;if(this.busy)
return Promise.resolve();if(this.identityStale===true){ui.addNotification(null,E('p',{},[_('Identity was updated on the device but the form is out of sync; refresh the page before saving.')]),'error');this.log('err','表单已过期，请刷新后保存。');return Promise.resolve();}
var values=this.collectValues(),previous=Object.assign({},this.baseline),errors=this.validateAll(values);if(errors.length){errors[0].field.input.focus();ui.addNotification(null,E('p',{},[_('The configuration was not saved: %d field(s) contain invalid values. Please check the highlighted inputs.').format(errors.length)]),'error');this.log('err',_('Validation failed for %d field(s); nothing was written.').format(errors.length));return Promise.resolve();}
var macChanged=previous.ethaddr.toUpperCase()!==values.ethaddr.toUpperCase(),idChanged=IDENTITY_KEYS.some(function(k){return previous[k]!==values[k];});this.setBusy(true,apply?_('Saving and applying…'):_('Saving configuration…'));var token=randomToken(),payload={ethaddr:values.ethaddr,loid:values.loid,password:values.password,gpon_sn:values.gpon_sn,gpon_regid:values.gpon_regid,ploam_password:values.ploam_password};return callConfigCommit(token,payload).then(function(res){if(!res||res.success!==true)
throw new Error(_('The device rejected the configuration commit (config_commit returned failure).'));self.log('ok',_('Configuration committed to uci (%s). Current protocol: %s.').format(CFG+'.'+SID,protoName(values.mode)));uci.unload(CFG);return uci.load(CFG);}).then(function(){self.baseline=self.readConfig();self.setFormValues(self.baseline);if(macChanged)
self.log('ok',_('PON MAC changes are applied to the live PON interface without a reboot.'));if(idChanged){var touched=IDENTITY_KEYS.filter(function(k){return previous[k]!==values[k];});self.log('info',_('Identity fields updated: %s').format(touched.map(function(key){return{ethaddr:'MAC 地址',loid:'LOID',password:'LOID 密码',gpon_sn:'SN',gpon_regid:'Registration ID',ploam_password:'PLOAM 密码'}[key]||key;}).join('、')));}
if(!apply)
return null;if(!idChanged){self.log('info',_('No identity field changed, runtime reload skipped.'));return null;}
return callReload(randomToken(),values).then(function(rres){if(!rres||rres.success!==true)
throw new Error(rres&&rres.error?_('Runtime reload failed: %s').format(String(rres.error)):_('Runtime reload failed.'));if(rres.warning)
self.log('warn',_('Runtime reload warning: %s').format(rres.warning==='adaptive_restart_failed'?_('Adaptive detector restart failed; retry when the service is available.'):String(rres.warning)));self.log('ok',_('PON identity reloaded at runtime. Active protocol: %s').format(rres.protocol?String(rres.protocol):protoName(values.mode)));return rres;});}).then(function(reloaded){var msgs=[E('p',{},[_('The PON configuration has been saved.')])];if(macChanged)
msgs.push(E('p',{},[_('PON MAC changes are applied to the live PON interface without a reboot.')]));if(reloaded)
msgs.push(E('p',{},[_('The PON identity was reloaded at runtime. Registration may briefly show a waiting state.')]));if(reloaded&&reloaded.warning)
msgs.push(E('p',{},[_('Runtime reload warning: %s').format(reloaded.warning==='adaptive_restart_failed'?_('Adaptive detector restart failed; retry when the service is available.'):String(reloaded.warning))]));ui.addNotification(null,msgs,(reloaded&&reloaded.warning)?'warning':'info');return self.refreshStatus();}).catch(function(err){var text=errText(err);ui.addNotification(null,[E('p',{},[_('The PON operation failed.')]),E('p',{},[text])],'error');self.log('err',text);}).finally(function(){self.setBusy(false);});},handleSave:function(ev){return this.doSave(false);},handleSaveApply:function(ev){return this.doSave(true);},handleReset:function(ev){this.setFormValues(this.baseline);this.log('info',_('Form values restored from the saved configuration.'));ui.addNotification(null,E('p',{},[_('Unsaved changes have been discarded.')]),'info');return Promise.resolve();},render:function(data){var self=this,initial=(data&&data[1])?data[1]:{};this.ui={};this.busy=false;this.identityStale=false;this.statusError=initial.__error||(!statusSnapshotValid(initial)?_('Invalid PON status payload'):null);this.statusFailures=this.statusError?1:0;this.statusValid=!this.statusError;this.status=this.statusValid?initial:{};this.statusLastUpdate=this.statusValid?nowStamp():null;this.baseline=this.readConfig();var root=E('div',{'class':'xg140g-pon-root'},[E('style',{'type':'text/css'},[CSS]),this.renderHeader(),this.renderOverview(),ponMode.render(this),this.renderModules(),E('div',{'class':'xg140g-pon-columns'},[E('div',{},[this.renderIdentity()]),E('div',{},[this.renderLog()])]),ponDiagnostics.render()]);this.setFormValues(this.baseline);this.updateStatus();if(this.statusError)
this.log('err',_('Initial status query failed: %s').format(this.statusError));else
this.log('info',_('PON status loaded.'));poll.add(function(){return self.refreshStatus();},5);return root;},addFooter:function(){return null;}});