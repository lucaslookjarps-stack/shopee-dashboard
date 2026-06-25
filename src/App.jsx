import { useState, useEffect, useCallback } from "react";

// ─── DADOS INICIAIS (do seu webhook) ──────────────────────────────────────────
const SEED_PRODUCTS = [
  { Id: 46758100928, Nome: "Kit 8 Peças Body + Mijão Conjunto Menina Menino Manga Longa Infantil", Preço: "49.98", Comissão: "0.16", Vendas: 734, Imagem: "https://cf.shopee.com.br/file/br-11134207-820md-mmj0fakyvj0nc5", Link: "https://s.shopee.com.br/60PT3X1oh7" },
  { Id: 22497501506, Nome: "Kit Enxoval Infantil 10 Peças Body Manga Longa E Mijao De Bebê Menino E Menina", Preço: "69.98", Comissão: "0.14", Vendas: 1408, Imagem: "https://cf.shopee.com.br/file/br-11134207-820l7-mnf0waellddt57", Link: "https://s.shopee.com.br/1BKDIeKDUg" },
  { Id: 58251839038, Nome: "Kit Carrinhos Patrulha Canina Com 9 Carros De Fricção Brinquedo Infantil Premium", Preço: "55.09", Comissão: "0.13", Vendas: 865, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mi5cd2od4c9212", Link: "https://s.shopee.com.br/4LHF6F37Ox" },
  { Id: 29292773277, Nome: "Kit Macacão Manta Cobertor Saída Maternidade Tricot Bolinhas Menino Menina Bebê", Preço: "79.9", Comissão: "0.07", Vendas: 889, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mfo9qbttjojpff", Link: "https://s.shopee.com.br/5AqM404zNq" },
  { Id: 58250144056, Nome: "Caminhão Dinossauro Engolidos de Carrinhos - com Kit de 6 e 4 Carrinhos", Preço: "74.5", Comissão: "0.13", Vendas: 632, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mffs07cp08hxfe", Link: "https://s.shopee.com.br/80AXSyp9y2" },
  { Id: 58255619413, Nome: "Kit 2 peças Macacão 100% algodão canelado liso linha luxo Menino ou Menina", Preço: "59.9", Comissão: "0.08", Vendas: 1345, Imagem: "https://cf.shopee.com.br/file/sg-11134201-81zvi-mmmf2pjh8kqw5b", Link: "https://s.shopee.com.br/18FuVOerV" },
  { Id: 23598387487, Nome: "Tapete para Banheiro de Secagem Rápida e Super Absorvente Ideal para Chuveiro", Preço: "12.8", Comissão: "0.09", Vendas: 6394, Imagem: "https://cf.shopee.com.br/file/br-11134207-7r98o-m8hpl5yislwxf7", Link: "https://s.shopee.com.br/4AxosA8nOh" },
  { Id: 20407976291, Nome: "Kit 2 Macacão Pelúcia Bebe Inverno De Pelo Carneiro Menina", Preço: "59.99", Comissão: "0.07", Vendas: 1977, Imagem: "https://cf.shopee.com.br/file/br-11134207-81ztc-mk8g93w2qfpdce", Link: "https://s.shopee.com.br/AAF21BlxEJ" },
  { Id: 22098874077, Nome: "Areia Higiênica Biodegradável Catbio 12 Kg (3 pacotes de 4 kg) - Max Clean", Preço: "133.9", Comissão: "0.07", Vendas: 8572, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mdxnq2dguwht29", Link: "https://s.shopee.com.br/1LddUxJa8s" },
  { Id: 58204723156, Nome: "Kit 48 Carrinhos com Fricção de Lata Metálica Coloridos - Caixa Container que Vira Pista", Preço: "74.13", Comissão: "0.16", Vendas: 390, Imagem: "https://cf.shopee.com.br/file/sg-11134201-825zq-mkcnt2h0ni87b9", Link: "https://s.shopee.com.br/8pjeSVlzH9" },
  { Id: 23799355108, Nome: "Caminhão Dinossauro Dino Engole Carrinhos Brinquedo Infantil Menino Kit Presente", Preço: "66.99", Comissão: "0.13", Vendas: 1233, Imagem: "https://cf.shopee.com.br/file/sg-11134201-8260n-ml4ey8056v45bd", Link: "https://s.shopee.com.br/5AqM5lzwi2" },
  { Id: 22996121313, Nome: "Areia Catbio Biodegradável 4 Kg - Max Clean - Grãos Finos", Preço: "46.9", Comissão: "0.07", Vendas: 24367, Imagem: "https://cf.shopee.com.br/file/sg-11134201-824i5-meirt0lhhr0m31", Link: "https://s.shopee.com.br/AKYQ8MxYpZ" },
  { Id: 50804162499, Nome: "Kit 6 Tapete De Banheiro 45x70cm Pezinho Piso Luxo Atoalhado 100% Algodão Premium", Preço: "32.9", Comissão: "0.08", Vendas: 4010, Imagem: "https://cf.shopee.com.br/file/br-11134207-81zuc-mkvlaxqrnmde44", Link: "https://s.shopee.com.br/40eOfr9Qje" },
  { Id: 51006015979, Nome: "Kit 400 Toalhas Umedecidas Chameguinho Baby Lenço Umedecido Infantil Higiene Bebê", Preço: "23.9", Comissão: "0.14", Vendas: 2133, Imagem: "https://cf.shopee.com.br/file/br-11134207-81ztc-mkij2fr51lhfd4", Link: "https://s.shopee.com.br/AKYSDUlJtI" },
  { Id: 20299321793, Nome: "1/2/3 Suporte De Shampoo Preto Organizador Alta qualidade Prateleira De Banheiro", Preço: "19", Comissão: "0.13", Vendas: 9771, Imagem: "https://cf.shopee.com.br/file/br-11134211-81zum-mko49067dddu01", Link: "https://s.shopee.com.br/2BCkUUGPRz" },
  { Id: 23394415893, Nome: "1080° Torneira Giratória de Braço Robótico Chuveiro Banheiro Cozinha Dois Modos", Preço: "28.98", Comissão: "0.1", Vendas: 3676, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mev5hs72r2mac1", Link: "https://s.shopee.com.br/5q62rE2S17" },
  { Id: 58205832467, Nome: "Escova de Silicone 2 em 1 para Vaso Sanitário - Base de Banheiro Alta Eficiência", Preço: "14.95", Comissão: "0.13", Vendas: 5618, Imagem: "https://cf.shopee.com.br/file/sg-11134201-8260s-ml5a6t2qwff3f8", Link: "https://s.shopee.com.br/4VafGm7Wij" },
  { Id: 12395259440, Nome: "Toalha De Cabelo Banho Mágica Para Secar Cabelo De Microfibra Grossa Touca Pós Banheiro", Preço: "10.59", Comissão: "0.19", Vendas: 7569, Imagem: "https://cf.shopee.com.br/file/c61d78be5c8b276952877cdea2728e81", Link: "https://s.shopee.com.br/3LOhsdBy5K" },
  { Id: 58201523970, Nome: "Tapete de Banheiro Absorvente Antiderrapante Secagem Rápida", Preço: "11.99", Comissão: "0.07", Vendas: 19101, Imagem: "https://cf.shopee.com.br/file/sg-11134201-8260b-mm4q3xn8yayw0f", Link: "https://s.shopee.com.br/gNwhjM7UY" },
  { Id: 22394343234, Nome: "Kit 4 Rolos de Sacos de Lixo 10L – 160 Unidades | Neutraliza Odores | Ideal para Pia e Banheiro", Preço: "29.8", Comissão: "0.18", Vendas: 7200, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mh5k70jhwveo39", Link: "https://s.shopee.com.br/4LHF4T8A3g" },
  { Id: 22498213091, Nome: "Ducha Higiênica Para Banheiro Completa Luxo Inox 1,2m Chuveirinho Privada", Preço: "19.9", Comissão: "0.19", Vendas: 9723, Imagem: "https://cf.shopee.com.br/file/br-11134207-820le-mnl66469oy6a1c", Link: "https://s.shopee.com.br/20tKIBH2mw" },
  { Id: 22198797147, Nome: "Prateleiras para Banheiro com Suporte e Alto Adesivos – Organizador de Shampoo", Preço: "12.88", Comissão: "0.12", Vendas: 15100, Imagem: "https://cf.shopee.com.br/file/br-11134207-820l9-mn1uzb42hx4yd8", Link: "https://s.shopee.com.br/qhMu2LU9b" },
  { Id: 23798655797, Nome: "Suporte para Escova de Dentes com Dispensador de Creme Dental", Preço: "14.49", Comissão: "0.08", Vendas: 16273, Imagem: "https://cf.shopee.com.br/file/br-11134207-820lh-mn3pco1qhlac0a", Link: "https://s.shopee.com.br/1BKDIeKDTd" },
  { Id: 19497995058, Nome: "Escova de Limpeza 9 Em 1 Recarregavél Elétrica Giratória Com Cabo Alongador", Preço: "53.46", Comissão: "0.11", Vendas: 6164, Imagem: "https://cf.shopee.com.br/file/br-11134207-820md-mn3pro2ux69uf2", Link: "https://s.shopee.com.br/5fmcev35M4" },
  { Id: 23696895359, Nome: "Armário Carrinho Organizador Multiuso Com 4 Camadas Com Rodinhas Cozinha Banheiro", Preço: "41.99", Comissão: "0.08", Vendas: 8372, Imagem: "https://cf.shopee.com.br/file/br-11134207-7r98r-llp2niz8vuwnb6", Link: "https://s.shopee.com.br/3qKyTYA44P" },
  { Id: 58251788374, Nome: "Ducha Higiênica Para Banheiro Completa Luxo Inox Núcleo Da Válvula De Cobre 1,2m", Preço: "19.9", Comissão: "0.07", Vendas: 7614, Imagem: "https://cf.shopee.com.br/file/br-11134207-81ztc-mkasojuzj3lse5", Link: "https://s.shopee.com.br/2g915PEVRG" },
  { Id: 22893970041, Nome: "Kit 3 Prateleiras 30cm MDF Luxo Nichos Sala Cozinha Quarto Banheiro", Preço: "19.9", Comissão: "0.13", Vendas: 5274, Imagem: "https://cf.shopee.com.br/file/br-11134207-7r98o-mbgmhgy7lwfsaa", Link: "https://s.shopee.com.br/5AqM404zMn" },
  { Id: 20897728596, Nome: "Espelho Redondo Adnet Couro Costurado 60cm Sala Quarto Banheiro Hall", Preço: "19.9", Comissão: "0.13", Vendas: 4683, Imagem: "https://cf.shopee.com.br/file/br-11134207-820lg-mlpbs76nr2f9d6", Link: "https://s.shopee.com.br/5L9mGJ4M22" },
  { Id: 23294540537, Nome: "Kit 4 Sacos de Lixo Perfumados Lavanda | 160 Sacos | Neutraliza Odores", Preço: "29.9", Comissão: "0.15", Vendas: 5437, Imagem: "https://cf.shopee.com.br/file/br-11134207-81z1k-mfyyp9j2nk7bf2", Link: "https://s.shopee.com.br/4fu5T56tNi" },
  { Id: 18856357121, Nome: "Kit 2 Prateleiras Suporte Com Alto Adesivos Para Parede Banheiro Cozinha", Preço: "18.99", Comissão: "0.07", Vendas: 4627, Imagem: "https://cf.shopee.com.br/file/br-11134207-7r98o-m4et0gt4mdklca", Link: "https://s.shopee.com.br/9AMUpLplFx" },
  { Id: 22394222996, Nome: "5metros Fita Selante De PVC À Prova D'Água Para Cozinha / Banheiro / Banheira", Preço: "10.1", Comissão: "0.06", Vendas: 5423, Imagem: "https://cf.shopee.com.br/file/br-11134207-7r98o-mcz6oi7s14c299", Link: "https://s.shopee.com.br/7KuqdywjyU" },
  { Id: 58256810554, Nome: "1 ou 2 Suporte Banheiro Antiferrugem Adesivo Sem Furo Organizador Multiuso Na Parede", Preço: "11.49", Comissão: "0.07", Vendas: 7370, Imagem: "https://cf.shopee.com.br/file/br-11134207-820m8-mlqmel3hubrb47", Link: "https://s.shopee.com.br/3Vi84wBKkN" },
].map((item) => mapItem(item));

function mapItem(item) {
  // Suporta tanto campos em inglês (webhook n8n) quanto em português (Google Sheets)
  const rawComm = item.commissionRate ?? item["Comissão"] ?? item.Comissão ?? "";
  const commNum = parseFloat(rawComm);
  const commLabel = !isNaN(commNum)
    ? commNum > 1 ? `R$ ${commNum.toFixed(2)}` : `${(commNum * 100).toFixed(0)}%`
    : String(rawComm);
  return {
    id:         String(item.itemId ?? item["Id"] ?? item.Id ?? Date.now()),
    name:       item.productName ?? item["Nome"] ?? item.Nome ?? "Produto sem nome",
    price:      String(item.price ?? item["Preço"] ?? item.Preço ?? ""),
    img:        item.imageUrl ?? item["Imagem"] ?? item.Imagem ?? "",
    link:       item.offerLink ?? item.productLink ?? item["Link"] ?? item.Link ?? "",
    sales:      Number(item.sales ?? item["Vendas"] ?? item.Vendas ?? 0),
    commission: commLabel,
    status:     "pending",
    aiText:     "",
    platform:   "Shopee",
  };
}

const DEFAULT_CONFIG = {
  n8nWebhookUrl: "https://thaissabina.app.n8n.cloud/webhook/shopee-produtos",
  evolutionUrl: "", evolutionKey: "", evolutionInstance: "shopee-bot", sendDelay: 3000,
  openaiKey: "",
  aiPrompt: "Crie uma chamada viral de promoção para WhatsApp para: {nome}, preço R${preco}, {vendas} vendas. Use emojis, seja empolgante, mostre urgência. Máximo 4 linhas.",
};

const INITIAL_GROUPS = [
  { id: 1, name: "Promoções Shopee 🛍️", jid: "120363000000001@g.us", active: true },
];

function statusInfo(s) {
  if (s === "sent")     return { label: "Enviada",  bg: "#DBEAFE", color: "#1E40AF" };
  if (s === "approved") return { label: "Aprovada", bg: "#D1FAE5", color: "#065F46" };
  return                       { label: "Pendente", bg: "#FFF3CD", color: "#856404" };
}

function Toast({ msg, visible }) {
  if (!visible) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, background: "#25D366", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, zIndex: 9999, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
      ✅ {msg}
    </div>
  );
}

function Overlay({ onClick, children }) {
  return (
    <div onClick={onClick} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "18px 20px", marginBottom: 14 }}>
      <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#111" }}>{title}</h4>
      {children}
    </div>
  );
}

function bs(bg, color, extra = {}) {
  return { background: bg, color, border: "none", borderRadius: 8, height: 36, padding: "0 14px", fontSize: 13, cursor: "pointer", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 5, ...extra };
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts]       = useState(SEED_PRODUCTS);
  const [groups, setGroups]           = useState(INITIAL_GROUPS);
  const [config, setConfig]           = useState(DEFAULT_CONFIG);
  const [tab, setTab]                 = useState("products");
  const [search, setSearch]           = useState("");
  const [filterStatus, setFilter]     = useState("all");
  const [editModal, setEditModal]     = useState(null);
  const [sendModal, setSendModal]     = useState(null);
  const [selGroups, setSelGroups]     = useState({});
  const [toast, setToast]             = useState({ msg: "", visible: false });
  const [webhookLog, setWebhookLog]   = useState([]);
  const [polling, setPolling]         = useState(false);
  const [lastPoll, setLastPoll]       = useState(null);
  const [aiLoading, setAiLoading]     = useState({});

  const showToast = (msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3500);
  };

  // ── SINCRONIZAR N8N CLOUD ─────────────────────────────────────────────────
  const syncN8n = useCallback(async () => {
    if (!config.n8nWebhookUrl) return;
    setPolling(true);
    try {
      const res = await fetch(config.n8nWebhookUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : [];
      if (items.length === 0) throw new Error("Webhook retornou lista vazia");

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const seen = new Set();
        const novos = items
          .filter((item) => {
            const id = String(item["Id"] ?? item.Id ?? "");
            if (seen.has(id) || existingIds.has(id)) return false;
            seen.add(id);
            return true;
          })
          .map(mapItem);

        setWebhookLog((l) => [{ ts: new Date().toLocaleTimeString("pt-BR"), count: novos.length, total: items.length, ok: true }, ...l.slice(0, 19)]);
        if (novos.length > 0) showToast(`${novos.length} produto(s) novo(s) carregado(s)!`);
        else showToast("Tudo atualizado — nenhum produto novo.");
        return novos.length > 0 ? [...novos, ...prev] : prev;
      });
      setLastPoll(new Date().toLocaleTimeString("pt-BR"));
    } catch (e) {
      setWebhookLog((l) => [{ ts: new Date().toLocaleTimeString("pt-BR"), ok: false, err: e.message }, ...l.slice(0, 19)]);
    }
    setPolling(false);
  }, [config.n8nWebhookUrl]);

  useEffect(() => { const id = setInterval(syncN8n, 60000); return () => clearInterval(id); }, [syncN8n]);

  // ── GERAR IA (OpenAI GPT-4o-mini) ────────────────────────────────────────
  const generateAI = async (product, onDone) => {
    if (!config.openaiKey) {
      onDone("⚠️ Adicione sua chave da OpenAI em Configurações → Chave OpenAI.");
      return;
    }
    setAiLoading((l) => ({ ...l, [product.id]: true }));
    try {
      const prompt = config.aiPrompt
        .replace("{nome}", product.name).replace("{preco}", product.price)
        .replace("{vendas}", product.sales).replace("{comissao}", product.commission);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${config.openaiKey}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 300,
          messages: [
            { role: "system", content: "Você é um especialista em marketing de afiliados no Brasil. Cria chamadas virais para WhatsApp com emojis, linguagem informal e urgência." },
            { role: "user", content: prompt }
          ],
        }),
      });
      const d = await res.json();
      if (d.error) throw new Error(d.error.message);
      onDone(d.choices?.[0]?.message?.content || "Erro ao gerar.");
    } catch (e) { onDone(`Erro: ${e.message}`); }
    setAiLoading((l) => ({ ...l, [product.id]: false }));
  };

  const generateAllAI = async () => {
    const pending = products.filter((p) => !p.aiText);
    for (const p of pending) {
      await generateAI(p, (text) =>
        setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, aiText: text, status: "approved" } : x))
      );
    }
    showToast("Chamadas geradas!");
  };

  // ── ENVIO WHATSAPP ────────────────────────────────────────────────────────
  const confirmSend = async () => {
    const chosen = groups.filter((g) => selGroups[g.id]);
    if (!chosen.length) { showToast("Selecione ao menos um grupo."); return; }
    const toSend = sendModal === "all"
      ? products.filter((p) => p.status !== "sent")
      : [products.find((p) => p.id === sendModal)].filter(Boolean);
    setSendModal(null);
    showToast("Enviando...");
    let ok = 0;
    for (const p of toSend) {
      const msg = `${p.aiText || p.name}\n\n🔗 ${p.link}`;
      for (const g of chosen) {
        try {
          await fetch(`${config.evolutionUrl}/message/sendText/${config.evolutionInstance}`, {
            method: "POST", headers: { "Content-Type": "application/json", apikey: config.evolutionKey },
            body: JSON.stringify({ number: g.jid, text: msg }),
          });
        } catch { }
      }
      setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, status: "sent" } : x));
      ok++;
      await new Promise((r) => setTimeout(r, Number(config.sendDelay) || 3000));
    }
    showToast(`${ok} oferta(s) enviada(s)! ✅`);
  };

  const stats = {
    total: products.length,
    pending: products.filter((p) => p.status !== "sent").length,
    sent: products.filter((p) => p.status === "sent").length,
    groups: groups.filter((g) => g.active).length,
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", minHeight: "100vh", background: "#f4f4f5", paddingBottom: 40 }}>

      {/* TOPBAR */}
      <div style={{ background: "#EE4D2D", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: "#fff", color: "#EE4D2D", fontWeight: 700, fontSize: 15, borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>S</div>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>Shopee Afiliados · Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={syncN8n} disabled={polling} style={bs("rgba(255,255,255,0.18)", "#fff")}>
            {polling ? "⟳ Sincronizando..." : "⟳ Sincronizar n8n"}
          </button>
          <button onClick={() => { setSendModal("all"); setSelGroups(Object.fromEntries(groups.filter((g) => g.active).map((g) => [g.id, true]))); }} style={bs("#25D366", "#fff")}>
            ▶ Enviar todos
          </button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", padding: "0 20px" }}>
        {["products", "webhook", "config"].map((t) => (
          <div key={t} onClick={() => setTab(t)} style={{ padding: "12px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, borderBottom: tab === t ? "2px solid #EE4D2D" : "2px solid transparent", color: tab === t ? "#EE4D2D" : "#6b7280", marginBottom: -1 }}>
            {{ products: "📦 Produtos", webhook: "🔗 Webhook", config: "⚙️ Configurações" }[t]}
          </div>
        ))}
        {lastPoll && <span style={{ marginLeft: "auto", alignSelf: "center", fontSize: 11, color: "#9ca3af" }}>última sinc: {lastPoll}</span>}
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 16px 0" }}>

        {/* ── PRODUTOS ── */}
        {tab === "products" && (
          <>
            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Total", val: stats.total, color: "#1d4ed8" },
                { label: "Aguardando envio", val: stats.pending, color: "#d97706" },
                { label: "Enviados", val: stats.sent, color: "#16a34a" },
                { label: "Grupos ativos", val: stats.groups, color: "#7c3aed" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", border: "1px solid #e5e7eb" }}>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* TOOLBAR */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produto..." style={{ flex: 1, minWidth: 160, height: 36, padding: "0 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
              <select value={filterStatus} onChange={(e) => setFilter(e.target.value)} style={{ height: 36, padding: "0 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, background: "#fff" }}>
                <option value="all">Todos</option>
                <option value="pending">Pendente</option>
                <option value="approved">Aprovada</option>
                <option value="sent">Enviada</option>
              </select>
              <button onClick={generateAllAI} style={bs("#185FA5", "#fff")}>🤖 Gerar IA para todos</button>
            </div>

            {/* CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {filtered.map((p) => {
                const st = statusInfo(p.status);
                return (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column" }}>
                    {/* IMAGEM */}
                    <div style={{ height: 150, background: "#f9fafb", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={p.img} alt={p.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.target.src = ""; e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:36px">🛍️</div>'; }}
                      />
                    </div>

                    <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: 11, background: "#FFF3CD", color: "#856404", padding: "2px 8px", borderRadius: 20, fontWeight: 500, alignSelf: "flex-start", marginBottom: 5 }}>
                        {p.platform}
                      </span>
                      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#EE4D2D", marginBottom: 3 }}>
                        R$ {p.price}
                      </div>
                      <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6 }}>
                        🛒 {Number(p.sales).toLocaleString("pt-BR")} vendas · {p.commission} comissão
                      </div>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.color, alignSelf: "flex-start", marginBottom: 8 }}>
                        {st.label}
                      </span>

                      {/* CHAMADA IA */}
                      <div style={{ background: "#f0f9ff", borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#0369a1", marginBottom: 3 }}>🤖 CHAMADA IA</div>
                        {aiLoading[p.id]
                          ? <div style={{ fontSize: 11, color: "#6b7280" }}>Gerando...</div>
                          : p.aiText
                            ? <div style={{ fontSize: 11, whiteSpace: "pre-line", lineHeight: 1.5 }}>{p.aiText}</div>
                            : <button onClick={() => generateAI(p, (text) => setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, aiText: text, status: "approved" } : x)))} style={{ fontSize: 11, color: "#0369a1", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                + Gerar chamada
                              </button>
                        }
                      </div>

                      {/* AÇÕES */}
                      <div style={{ display: "flex", gap: 5 }}>
                        <button onClick={() => setEditModal({ ...p })} style={{ ...bs("#f3f4f6", "#374151"), flex: 1, height: 30, fontSize: 11 }}>✏️ Editar</button>
                        <button onClick={() => { setSendModal(p.id); setSelGroups(Object.fromEntries(groups.filter((g) => g.active).map((g) => [g.id, true]))); }} style={{ ...bs("#25D366", "#fff"), height: 30, fontSize: 11, padding: "0 10px" }}>▶</button>
                        <button onClick={() => { if (confirm("Excluir?")) setProducts((prev) => prev.filter((x) => x.id !== p.id)); }} style={{ ...bs("#fee2e2", "#dc2626"), height: 30, fontSize: 11, padding: "0 10px" }}>🗑</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── WEBHOOK ── */}
        {tab === "webhook" && (
          <div style={{ maxWidth: 720 }}>
            <Section title="☁️ n8n Cloud — URL do Webhook">
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
                O dashboard sincroniza automaticamente a cada 60s. Produtos já carregados ficam salvos na sessão.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input readOnly value={config.n8nWebhookUrl} style={{ flex: 1, height: 36, padding: "0 12px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12, background: "#f9fafb" }} />
                <button onClick={() => { navigator.clipboard.writeText(config.n8nWebhookUrl); showToast("URL copiada!"); }} style={bs("#185FA5", "#fff")}>Copiar</button>
                <button onClick={syncN8n} disabled={polling} style={bs("#EE4D2D", "#fff")}>{polling ? "⟳" : "⟳ Testar"}</button>
              </div>
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "10px 14px", marginTop: 10, fontSize: 12, color: "#92400e" }}>
                ⚠️ <strong>CORS:</strong> A sincronização automática só funciona quando o dashboard está hospedado fora do Claude (ex: em seu servidor ou Vercel). Dentro do Claude, use os dados já carregados abaixo.
              </div>
            </Section>

            <Section title="📋 Campos esperados do webhook">
              <div style={{ background: "#1e293b", borderRadius: 8, padding: "14px 16px", overflowX: "auto" }}>
                <pre style={{ color: "#e2e8f0", fontSize: 12, margin: 0, lineHeight: 1.8, fontFamily: "monospace" }}>{`[
  {
    "Id":        46758100928,
    "Nome":      "Kit 8 Peças Body + Mijão...",
    "Preço":     "49.98",
    "Comissão":  "0.14",
    "Vendas":    734,
    "Imagem":    "https://cf.shopee.com.br/file/...",
    "Link":      "https://s.shopee.com.br/...",
    "Status":    "Pronto"
  }
]`}</pre>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", marginTop: 10, fontSize: 13, color: "#166534" }}>
                ✅ Estes campos já batem com o que seu webhook retorna. Nenhuma alteração no n8n necessária.
              </div>
            </Section>

            <Section title="📡 Log de sincronizações">
              {webhookLog.length === 0
                ? <p style={{ fontSize: 13, color: "#9ca3af" }}>Nenhuma sincronização ainda. Clique em "Sincronizar n8n".</p>
                : webhookLog.map((l, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, fontSize: 12, padding: "6px 0", borderBottom: "1px solid #f3f4f6", color: l.ok ? "#16a34a" : "#dc2626" }}>
                    <span style={{ color: "#6b7280", flexShrink: 0 }}>{l.ts}</span>
                    <span>{l.ok ? `✅ ${l.count} novo(s) de ${l.total} total` : `❌ ${l.err}`}</span>
                  </div>
                ))
              }
            </Section>
          </div>
        )}

        {/* ── CONFIG ── */}
        {tab === "config" && (
          <div style={{ maxWidth: 680 }}>
            <Section title="🔗 Webhook n8n Cloud">
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>URL do Webhook</div>
                <input value={config.n8nWebhookUrl} onChange={(e) => setConfig((c) => ({ ...c, n8nWebhookUrl: e.target.value }))} placeholder="https://SEU-USUARIO.app.n8n.cloud/webhook/shopee-produtos" style={{ width: "100%", height: 34, padding: "0 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
              </div>
            </Section>

            <Section title="🤖 OpenAI (ChatGPT)">
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
                Crie sua chave gratuita em:{" "}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" style={{ color: "#185FA5" }}>platform.openai.com/api-keys</a>
                {" "}— modelo: <strong>gpt-4o-mini</strong> (rápido e barato).
              </p>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>Chave da API OpenAI</div>
                <input type="password" value={config.openaiKey} onChange={(e) => setConfig((c) => ({ ...c, openaiKey: e.target.value }))} placeholder="sk-proj-..." style={{ width: "100%", height: 34, padding: "0 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
              </div>
              {!config.openaiKey
                ? <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#92400e" }}>⚠️ Sem a chave o botão Gerar IA não funciona. Novos usuários ganham US$5 de crédito grátis.</div>
                : <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#166534" }}>✅ Chave configurada — ChatGPT pronto!</div>
              }
            </Section>

            <Section title="📱 Evolution API (WhatsApp gratuito)">
              <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
                Instale em: <a href="https://github.com/EvolutionAPI/evolution-api" target="_blank" rel="noreferrer" style={{ color: "#185FA5" }}>github.com/EvolutionAPI/evolution-api</a>
              </p>
              {[["URL da API", "evolutionUrl", "https://api.evolution.seudominio.com"], ["API Key", "evolutionKey", "sua-api-key"], ["Instância", "evolutionInstance", "shopee-bot"], ["Delay entre envios (ms)", "sendDelay", "3000"]].map(([label, key, ph]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>{label}</div>
                  <input value={config[key]} onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.value }))} placeholder={ph} style={{ width: "100%", height: 34, padding: "0 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
                </div>
              ))}
            </Section>

            <Section title="👥 Grupos do WhatsApp">
              {groups.map((g) => (
                <div key={g.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" checked={g.active} onChange={() => setGroups((prev) => prev.map((x) => x.id === g.id ? { ...x, active: !x.active } : x))} />
                    {g.name}
                  </label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{g.jid}</span>
                    <button onClick={() => setGroups((prev) => prev.filter((x) => x.id !== g.id))} style={{ ...bs("#fee2e2", "#dc2626"), height: 26, fontSize: 11 }}>Remover</button>
                  </div>
                </div>
              ))}
              <button onClick={() => { const name = prompt("Nome:"); const jid = prompt("JID (120363...@g.us):"); if (name && jid) { setGroups((prev) => [...prev, { id: Date.now(), name, jid, active: true }]); showToast("Grupo adicionado!"); } }} style={{ ...bs("#f3f4f6", "#374151"), marginTop: 10, fontSize: 12, height: 30 }}>
                + Adicionar grupo
              </button>
            </Section>

            <Section title="🤖 Prompt da IA">
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>Variáveis: <code style={{ fontSize: 11 }}>{"{nome}"}</code> <code style={{ fontSize: 11 }}>{"{preco}"}</code> <code style={{ fontSize: 11 }}>{"{vendas}"}</code></div>
              <textarea value={config.aiPrompt} onChange={(e) => setConfig((c) => ({ ...c, aiPrompt: e.target.value }))} style={{ width: "100%", height: 80, padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
            </Section>

            <button onClick={() => showToast("Configurações salvas!")} style={{ ...bs("#EE4D2D", "#fff"), height: 38, fontWeight: 600, width: "100%" }}>Salvar configurações</button>
          </div>
        )}
      </div>

      {/* MODAL EDIÇÃO */}
      {editModal && (
        <Overlay onClick={() => setEditModal(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, padding: 24, width: 460, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>✏️ Editar oferta</h3>
            {[["Nome", "name"], ["URL da imagem", "img"], ["Link afiliado", "link"]].map(([label, key]) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>{label}</div>
                <input value={editModal[key]} onChange={(e) => setEditModal((m) => ({ ...m, [key]: e.target.value }))} style={{ width: "100%", height: 34, padding: "0 10px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }} />
              </div>
            ))}
            {editModal.img && <img src={editModal.img} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} onError={(e) => e.target.style.display = "none"} />}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 3 }}>Chamada para WhatsApp</div>
              <textarea value={editModal.aiText} onChange={(e) => setEditModal((m) => ({ ...m, aiText: e.target.value }))} style={{ width: "100%", height: 110, padding: 10, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13, fontFamily: "inherit", resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setEditModal(null)} style={bs("#f3f4f6", "#374151")}>Cancelar</button>
              <button onClick={() => generateAI(editModal, (text) => setEditModal((m) => ({ ...m, aiText: text })))} style={bs("#185FA5", "#fff")}>🤖 Regerar IA</button>
              <button onClick={() => { setProducts((prev) => prev.map((p) => p.id === editModal.id ? { ...editModal, status: "approved" } : p)); setEditModal(null); showToast("Salvo!"); }} style={bs("#EE4D2D", "#fff")}>Salvar</button>
            </div>
          </div>
        </Overlay>
      )}

      {/* MODAL ENVIO */}
      {sendModal && (
        <Overlay onClick={() => setSendModal(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, padding: 24, width: 380, maxWidth: "95vw" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>📲 Selecionar grupos</h3>
            {groups.length === 0 && <p style={{ fontSize: 13, color: "#6b7280" }}>Nenhum grupo cadastrado. Adicione em Configurações.</p>}
            {groups.map((g) => (
              <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                <input type="checkbox" id={`sg-${g.id}`} checked={!!selGroups[g.id]} onChange={(e) => setSelGroups((s) => ({ ...s, [g.id]: e.target.checked }))} />
                <label htmlFor={`sg-${g.id}`} style={{ fontSize: 13, cursor: "pointer" }}>{g.name}</label>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={() => setSendModal(null)} style={bs("#f3f4f6", "#374151")}>Cancelar</button>
              <button onClick={confirmSend} style={bs("#25D366", "#fff")}>▶ Enviar agora</button>
            </div>
          </div>
        </Overlay>
      )}

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
