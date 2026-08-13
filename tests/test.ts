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
        it('must have a charset meta tag with UTF-8', () => {
            expect(htmlContent).toMatch(/<meta[^>]*charset=["']UTF-8["']/i);
        });

        it('must have a viewport meta tag with initial-scale=1.0', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*initial-scale=1\.0["']/i);
        });

        it('must have a viewport meta tag with width=device-width', () => {
            expect(htmlContent).toMatch(/<meta[^>]*name=["']viewport["'][^>]*content=["'][^"']*width=device-width["']/i);
        });
    });

    describe('Title Tag', () => {
        it('must have a title element', () => {
            expect(htmlContent).toMatch(/<title>[^<]+<\/title>/i);
        });

        it('must have a non-empty title', () => {
            const matches = htmlContent.match(/<title>([^<]+)<\/title>/i);
            expect(matches).not.toBeNull();
            if (matches) {
                expect(matches[1].trim()).not.toBe('');
            }
        });
    });

    describe('Body Tag', () => {
        it('must have opening and closing body tags', () => {
            expect(htmlContent).toMatch(/<body>/i);
            expect(htmlContent).toMatch(/<\/body>/i);
        });
    });

    describe('Head Tag', () => {
        it('must have opening and closing head tags', () => {
            expect(htmlContent).toMatch(/<head>/i);
            expect(htmlContent).toMatch(/<\/head>/i);
        });
    });

    describe('Closing HTML Tag', () => {
        it('must have a closing html tag', () => {
            expect(htmlContent).toMatch(/<\/html>/i);
        });
    });
});
