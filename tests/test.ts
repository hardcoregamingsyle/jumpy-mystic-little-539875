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
            expect(htmlContent).toMatch(/<html[^>]*lang=["'][^"']+["']/i);
        });

        it('must specify English language code', () => {
            expect(htmlContent).toMatch(/lang=["']en["']/i);
        });
    });

    describe('Meta Tags', () => {
        it('must have charset UTF-8 meta tag', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must have viewport meta tag with width=device-width and initial-scale=1.0', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["']width=device-width,\s*initial-scale=1.0["']/i);
        });
    });

    describe('Title Element', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
        });

        it('must have non-empty title content', () => {
            const match = htmlContent.match(/<title>([^<]+)<\/title>/i);
            expect(match).not.toBeNull();
            if (match) {
                expect(match[1].trim().length).toBeGreaterThan(0);
            }
        });
    });

    describe('Body Structure', () => {
        it('must have opening and closing body tags', () => {
            expect(htmlContent).toMatch(/<body>[\s\S]*<\/body>/i);
        });

        it('must have matching html closing tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });
    });
});
