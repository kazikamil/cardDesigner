import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  // Définir le chemin vers le répertoire fonts
  const fontsDirectory = path.join(process.cwd(), 'src', 'app', 'fonts');
  
  try {
    // Lire la liste des fichiers dans le répertoire fonts
    const files = await fs.readdir(fontsDirectory);

    // Filtrer uniquement les fichiers .zpl
    const zplFiles = files.filter(file => file.endsWith('.zpl'));

    // Lire et fusionner le contenu de chaque fichier dans une seule chaîne séparée par \n
    const mergedContent = (await Promise.all(zplFiles.map(async (file) => {
      const filePath = path.join(fontsDirectory, file);
      return fs.readFile(filePath, 'utf-8'); // Lire le fichier
    }))).join('\n'); // Fusionner avec un saut de ligne entre chaque fichier

    // Retourner le contenu fusionné
    return NextResponse.json({ data: mergedContent });
  } catch (error) {
    console.error('Erreur lors de la lecture des fichiers :', error);
    return NextResponse.json({ error: 'Échec de la lecture des fichiers' }, { status: 500 });
  }
}
