import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';

export default function App() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  // LEET変換関数
  const convertToLeet = (text: string): string => {
    const leetMap: { [key: string]: string } = {
      'A': '4', 'a': '4',
      'E': '3', 'e': '3',
      'I': '1', 'i': '1',
      'O': '0', 'o': '0',
      'S': '5', 's': '5',
      'T': '7', 't': '7',
      'L': '1', 'l': '1',
      'G': '6', 'g': '6',
      'B': '8', 'b': '8',
      'Z': '2', 'z': '2'
    };

    return text.replace(/[AaEeIiOoSsTtLlGgBbZz]/g, (char) => leetMap[char] || char);
  };

  const leetResult = convertToLeet(input);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(leetResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            LEET変換器
          </CardTitle>
          <CardDescription>
            ユーザーネームをLEETスピークに変換します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">ユーザーネーム</Label>
            <Input
              id="username"
              type="text"
              placeholder="ユーザーネームを入力..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {input && (
            <div className="space-y-3">
              <Label>LEET変換結果</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg border-2 border-dashed border-purple-200 min-h-[44px] flex items-center">
                  <span className="font-mono text-lg text-purple-700 break-all">
                    {leetResult || '変換結果がここに表示されます'}
                  </span>
                </div>
                <Button
                  onClick={handleCopy}
                  size="icon"
                  variant="outline"
                  className="shrink-0 transition-all duration-200 hover:bg-purple-50"
                  disabled={!leetResult}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 text-center animate-in fade-in-50">
                  コピーしました！
                </p>
              )}
            </div>
          )}

          {!input && (
            <div className="text-center text-muted-foreground py-8">
              <div className="text-4xl mb-2">🎮</div>
              <p>ユーザーネームを入力すると</p>
              <p>自動的にLEETスピークに変換されます</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <p className="mb-1"><strong>変換例:</strong></p>
            <div className="font-mono space-y-1">
              <div>Gamer → 64m3r</div>
              <div>Elite → 3l173</div>
              <div>Beast → 834s7</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}