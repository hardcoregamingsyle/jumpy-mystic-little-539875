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
            expect(htmlContent).toMatch(/lang=["']en['"]/i);
        });
    });

    describe('Head Section', () => {
        it('must contain a title element', () => {
            expect(htmlContent).toMatch(/<title>.*<\/title>/i);
        });

        it('must contain charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8['"][^>]*>/i);
        });

        it('must contain viewport meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport['"][^>]*content=["'][^"']*['"][^>]*>/i);
        });

        it('must have viewport content with initial-scale=1.0', () => {
            expect(htmlContent).toMatch(/initial-scale=1\.0/i);
        });
    });

    describe('Body Section', () => {
        it('must have a body element', () => {
            expect(htmlContent).toMatch(/<body>.*<\/body>/i);
        });
    });

    describe('File Structure', () => {
        it('must have a root html element', () => {
            expect(htmlContent).toMatch(/<html[^>]*>.*<\/html>/i);
        });

        it('must have proper nesting of head and body', () => {
            expect(htmlContent).toMatch(/<head>.*<\/head>\s*<body>.*<\/body>/i);
        });
    });
});