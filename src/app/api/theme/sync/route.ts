import { NextResponse } from 'next/server';
import {
  getCurrentDesignThemeFromFile,
  getAllConfigFileThemes,
  saveCurrentDesignThemeToFile,
  saveConfigFileTheme,
} from '@/lib/themeFileServer';

export async function GET() {
  const currentTheme = getCurrentDesignThemeFromFile();
  const configThemes = getAllConfigFileThemes();
  return NextResponse.json({
    currentTheme,
    configThemes,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { preset, action } = body;

    if (!preset) {
      return NextResponse.json({ error: 'Preset payload missing' }, { status: 400 });
    }

    if (action === 'saveConfig') {
      const savedConfig = saveConfigFileTheme(preset);
      const savedCurrent = saveCurrentDesignThemeToFile(preset);
      return NextResponse.json({ success: savedConfig && savedCurrent });
    }

    // Default action: update root currentdesigntheme.md
    const success = saveCurrentDesignThemeToFile(preset);
    return NextResponse.json({ success });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
