export async function generateRandomAvatar(): Promise<string> {
  try {
    // Rastgele bir yüz görseli çekmek için wsrv.nl servisini proxy olarak kullanıyoruz.
    // Timestamp ekleyerek tarayıcı önbelleğini aşıyor ve her seferinde yeni bir yüz gelmesini sağlıyoruz.
    const targetUrl = `https://thispersondoesnotexist.com/`;
    
    const timestamp = new Date().getTime();
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(targetUrl)}&w=300&h=300&fit=cover&t=${timestamp}&output=png`;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context could not be created'));
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } catch (error) {
          console.error('Canvas error:', error);
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = proxyUrl;
    });

  } catch (error) {
    console.error('Failed to fetch random avatar:', error);
    return generateFallbackAvatar();
  }
}

function generateFallbackAvatar(): string {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const size = 200;
  
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  ctx.fillStyle = randomColor;
  ctx.fillRect(0, 0, size, size);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  ctx.fillText(letter, size / 2, size / 2);
  
  return canvas.toDataURL();
}

export function loadImageAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to load image'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
