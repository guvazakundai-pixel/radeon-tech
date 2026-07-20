import {
  Laptop, Monitor, Gamepad2, Apple, Bug, MonitorCheck, FileWarning,
  Database, Cpu, Keyboard, Plug, Smartphone, Battery, Search,
  Wifi, Printer, Briefcase, Shield, Users, Award, Clock,
  CheckCircle, Headphones, Wrench, Gauge, DollarSign, ShieldCheck,
  Star, HeartHandshake, MessageCircle, ClipboardCheck, Zap, Fan,
  Cable, ArrowUpRight, Video, Edit3, ChevronDown, Image as ImageIcon,
  Thermometer, HardDrive, AlertTriangle, Droplets, MapPin, Phone,
  Mail, Send, CircuitBoard, LayoutDashboard, Link2, Plus, Trash2,
  Package, BarChart3, HelpCircle, Type, LogOut, Save, ShoppingCart,
  Newspaper, ExternalLink, MemoryStick, Mouse, Quote, ChevronUp,
  Computer, CalendarCheck, ClipboardList,
} from "lucide-react";

const iconMap = {
  Laptop, Monitor, Gamepad2, Apple, Bug, MonitorCheck, FileWarning,
  Database, Cpu, Keyboard, Plug, Smartphone, Battery, Search,
  Wifi, Printer, Briefcase, Shield, Users, Award, Clock,
  CheckCircle, Headphones, Wrench, Gauge, DollarSign, ShieldCheck,
  Star, HeartHandshake, MessageCircle, ClipboardCheck, Zap, Fan,
  Cable, ArrowUpRight, Video, Edit3, ChevronDown,
  Thermometer, HardDrive, AlertTriangle, Droplets, MapPin, Phone,
  Mail, Send, CircuitBoard, LayoutDashboard, Link2, Plus, Trash2,
  Package, BarChart3, HelpCircle, Type, LogOut, Save, ShoppingCart,
  Newspaper, ExternalLink, MemoryStick, Mouse, Quote, ChevronUp,
  Computer, CalendarCheck, ClipboardList,
  Image: ImageIcon,
};

export function getIcon(name) {
  return iconMap[name] || Cpu;
}
