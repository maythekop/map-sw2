# ติดตามโครงการ สท.2 — ตัวห่อ PWA

ตัวห่อสำหรับติดตั้ง **ระบบติดตามโครงการก่อสร้างทางหลวง (Map_v.1)** เป็นไอคอนบนหน้าจอมือถือ/คอมพิวเตอร์ แบบแอปทั่วไป
ไม่มีโค้ดหรือข้อมูลของระบบอยู่ในนี้ — มีแค่หน้าเปิดแอป ไอคอน และ manifest · โค้ดจริงอยู่ใน Google Apps Script

```
map-sw2/
├─ index.html      หน้าเปิดแอป (splash + iframe ไปยังลิงก์ /exec)  ★ แก้ APP_URL บรรทัดบนสุดถ้าเปลี่ยน deployment
├─ manifest.json   ชื่อแอป สี และไอคอน
├─ sw.js           service worker (แคชเฉพาะไฟล์ตัวห่อ)
├─ icons/          icon-192 · icon-512 · maskable-512 · apple-touch-icon · favicon-32
└─ .nojekyll       ให้ GitHub Pages เสิร์ฟไฟล์ตรง ๆ
```

## ขึ้น GitHub Pages (ครั้งเดียว)

1. GitHub Desktop → **File → Add local repository** → เลือกโฟลเดอร์ `map-sw2` → ถ้าถามให้ **create a repository** → Commit
2. **Publish repository** → ชื่อ `map-sw2` → **เอาติ๊ก "Keep this code private" ออก** (Pages ของบัญชีฟรีต้องเป็น public) → Publish
3. บน github.com เปิด repo → **Settings → Pages** → Source: *Deploy from a branch* · Branch: `main` / `(root)` → Save
4. รอ 1–2 นาที → เปิด `https://<ชื่อบัญชี>.github.io/map-sw2/` จะเห็น splash แล้วเข้าหน้าล็อกอินของแอป

## แจกให้ผู้ใช้ติดตั้ง

| อุปกรณ์ | วิธี |
|---|---|
| iPhone / iPad | เปิดลิงก์ใน **Safari** → ปุ่มแชร์ → **เพิ่มไปยังหน้าจอโฮม** |
| Android | เปิดใน **Chrome** → เมนู ⋮ → **ติดตั้งแอป** (หรือ "เพิ่มไปยังหน้าจอหลัก") |
| Windows / Mac | Chrome หรือ Edge → ไอคอน "ติดตั้ง" ในแถบที่อยู่ |

## ถ้าเปลี่ยน deployment ของ Apps Script
แก้ `APP_URL` ใน `index.html` → เปลี่ยนเลข `VERSION` ใน `sw.js` → Commit → Push · ไอคอนที่ติดตั้งไว้แล้วจะใช้ลิงก์ใหม่เองเมื่อเปิดครั้งถัดไป

## ข้อกำหนดฝั่ง Apps Script
`doGet` ต้องตั้ง `setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)` (Code.gs รอบ 13 ตั้งไว้แล้ว) มิฉะนั้นหน้าแอปจะไม่แสดงใน iframe
