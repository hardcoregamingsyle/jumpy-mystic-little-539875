import * as fs from 'fs';
import * as path from 'path';

describe('HUD Radar HTML Structure Tests', () => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
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
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+["']/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/lang=["']en["']/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must have viewport meta tag for responsive design', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1\.0["']/i);
        });
    });

    describe('Title Element', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
        });

        it('title must be non-empty', () => {
            const match = htmlContent.match(/<title>([^<]+)<\/title>/i);
            expect(match).not.toBeNull();
            if (match) {
                expect(match[1].trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Closing Tags', () => {
        it('must have closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });

        it('must have closing head tag', () => {
            expect(htmlContent).toMatch(/<\/head>/i);
        });

        it('must have closing body tag', () => {
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });

    describe('Structure', () => {
        it('must have <!DOCTYPE html> before <html>', () => {
            const docIndex = htmlContent.indexOf('<!DOCTYPE html>');
            const htmlIndex = htmlContent.indexOf('<html');
            expect(docIndex).toBeLessThan(htmlIndex);
        });

        it('must have <head> before <body>', () => {
            const headIndex = htmlContent.indexOf('<head>');
            const bodyIndex = htmlContent.indexOf('<body>');
            expect(headIndex).toBeGreaterThan(0);
            expect(bodyIndex).toBeGreaterThan(headIndex);
        });

        it('must have <body> before </html>', () => {
            const bodyIndex = htmlContent.indexOf('<body>');
            const htmlCloseIndex = htmlContent.indexOf('</html>');
            expect(bodyIndex).toBeGreaterThan(0);
            expect(htmlCloseIndex).toBeGreaterThan(bodyIndex);
        });
    });
});
