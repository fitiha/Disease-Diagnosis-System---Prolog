import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Phone, Mail, Menu } from 'lucide-react'
import docimg from "@/public/doc.png"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              MediExpert
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-lg hover:text-primary">Home</Link>
              <Link href="/diagnosis" className="text-lg hover:text-primary">Diagnosis</Link>
              <Link href="#about" className="text-lg hover:text-primary">About Us</Link>
              <Link href="#services" className="text-lg hover:text-primary">Services</Link>
              <Link href="#contact" className="text-lg hover:text-primary">Contact</Link>
            </div>
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Trust Your Health to Our Advanced AI Diagnostic System
            </h1>
            <p className="text-xl text-muted-foreground">
              Get instant preliminary diagnoses through our expert system. Answer simple questions about your symptoms and receive AI-powered medical insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnosis">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Diagnosis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src={docimg}
              alt="Medical Professional"
              className="rounded-2xl shadow-2xl"
              width={600}
              height={600}
            />
            <Card className="absolute bottom-8 right-8 w-80">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold">AI Diagnosis</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="ml-1 text-lg">4.9</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Quick and accurate preliminary diagnoses based on your symptoms
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Average Time</p>
                      <p className="font-semibold text-lg">5 min</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Success Rate</p>
                      <p className="font-semibold text-lg">95%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Enter Your Information</h3>
                <p className="text-muted-foreground">
                  Provide your basic information to start the diagnosis process.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Answer Questions</h3>
                <p className="text-muted-foreground">
                  Respond to specific questions about your symptoms and condition.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="space-y-4 pt-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Get Your Diagnosis</h3>
                <p className="text-muted-foreground">
                  Receive an instant preliminary diagnosis based on your symptoms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Check Your Health?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start using our AI-powered diagnostic system now. It&apos;s quick, easy, and provides valuable health insights.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/diagnosis">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Diagnosis
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">MediExpert</h3>
              <p className="text-muted-foreground max-w-md">
                Advanced AI-powered medical diagnostic system providing quick and accurate preliminary health assessments.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>support@mediexpert.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

