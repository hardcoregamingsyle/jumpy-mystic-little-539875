import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'src', 'index.html');
    let htmlContent: string;

    beforeAll(() => {
        expect(fs.existsSync(htmlPath)).toBe(true);
        htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    });

    describe('Document Type Declaration', () => {
        it('must contain valid HTML5 DOCTYPE declaration', () => {
            expect(htmlContent).toMatch(/<!DOCTYPE html>/i);
        });
    });

    describe('HTML Tag', () => {
        it('must have opening html tag with lang attribute', () => {
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+['"]/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/<html[^>]*lang=["']en['"]/i);
        });
    });

    describe('Meta Tags', () => {
        it('must contain UTF-8 charset meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8['"]/i);
        });

        it('must contain viewport meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport['"]\s*content=["'][^"']+['"]/i);
        });
    });

    describe('Title Element', () => {
        it('must contain title element with correct text', () => {
            expect(htmlContent).toMatch(/<title>Stealth Bomber HUD Radar<\/title>/i);
        });
    });
});
