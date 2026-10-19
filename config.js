/* ============================================================
 *  중대 현황 앱 설정 — 이 파일만 고치면 됩니다
 * ============================================================ */
self.APP_CONFIG = {

  // ① Apps Script 웹 앱 주소 (/exec 로 끝나는 주소)
  APP_URL: 'https://script.google.com/macros/s/AKfycbzGSQDQFe9Nc2AeK1xiYHxD8i21XqmICluTHnk5zAM8A0X6tdjQ4a5FkJ4wjKLRf3hy/exec',

  // ② Firebase 콘솔 → 프로젝트 설정 → 일반 → 내 앱(웹) → "SDK 설정 및 구성"의 firebaseConfig 값을 그대로 옮겨 적으세요
  FIREBASE: {
    apiKey: 'AIzaSyCfw4yvkJzvbjbc93RiAkwQvMh_MFWeOic',
    authDomain: 'gwangaetoon.firebaseapp.com',
    projectId: 'gwangaetoon',
    storageBucket: 'gwangaetoon.firebasestorage.app',
    messagingSenderId: '326182366131',
    appId: '1:326182366131:web:e64684b271a17db5caf9c6',
  },

  // ③ Firebase 콘솔 → 프로젝트 설정 → 클라우드 메시징 → 웹 푸시 인증서 → "키 쌍" 값
  VAPID_KEY: 'BFSQKBh12ckQoGnwP7CrhvgfcL9HTLdn525eomIZd3kZ7OZnycdviKCWZGn4Ubo7RL5vx6sM5rOmGi6MIGST_AA',
};
